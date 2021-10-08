import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import { createMetadata } from "../help/createMetadata";

import knex from "../../../../db/knex";
import { setCooldown } from "../../../common/cooldown/middleware/comandCooldown";
import { addAssassin } from "../../reactions/assassinations";
import User from "../../../common/types/User";

export const msToTime = (duration: number) => {
    const milliseconds = Math.floor((duration % 1000) / 100) as string | number;
    let seconds = Math.floor((duration / 1000) % 60) as string | number,
        minutes = Math.floor((duration / (1000 * 60)) % 60) as string | number,
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24) as
            | string
            | number;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};

// const talkedRecently = new Set();

export default new Command()
    .match(matchPrefixesStrict("assassinate"))
    .setMetadata(
        createMetadata({
            name: "Start the assasination of someone",
            usage: "cc!assassinate [serverid] [userid]",
            description:
                "You will be given a word and you will have to make your target say that word, without trying to use any kind of tricks, because there is a catch, if you manage to make that person say that word you were given they will lose 5% of their money, 3% of them will go to you and 2% will be lost, but if you cant manage to make that person say that word you will lose 5% of your money, 3% going to the target and 2% being lost."
        })
    )
    .use(setCooldown(10000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (message.channel.type !== "dm")
            return message.channel.send(
                "**Error:** You cannot initialise an assassination in a server, you can only do it in the dms."
            );

        if (args.length !== 2)
            return message.channel.send(
                "**Error:** Invalid number of arguments."
            );

        if (args[0].length > 24)
            return message.channel.send("**Error:** Server id is too long.");
        if (args[1].length > 24)
            return message.channel.send("**Error:** Target id is too long.");
        if (message.author.id === args[1])
            return message.channel.send(
                "**Error:** You cannot target yourself."
            );
        if (
            !(await knex("user")
                .where({ userid: args[1] })
                .first())
        ) {
            return message.channel.send(
                "**Error:** Target id doesn't exist in the database. Make sure that the target has talked in a server where Codify is present at least once. You can check if their profile exists by using the command **cc!profile <yourTarget>**"
            );
        }
        // if(talkedRecently.has(message.author.id)){
        //     return message.channel.send("You have to wait 5 seconds before using this command again.")
        // }

        const user = await knex<User>("user")
            .where({ userid: message.author.id })
            .first();

        if (!user!.assassin) {
            return message.channel.send(
                "**Error:** You cannot assassinate anyone because you have opted out from the minigame."
            );
        }

        const target = await knex<User>("user")
            .where({ userid: args[1] })
            .first();

        if (!target!.assassin) {
            return message.channel.send(
                "**Error:** You cannot assassinate this target because they have opted out of the minigame."
            );
        }

        const assasin: Array<{
            assasin: string;
            target: string;
            serverid: string;
            keywordid: string;
            date: string;
        }> = await knex("assasins").where({
            assasin: message.author.id
        });

        if (assasin.length) {
            return message.channel.send(
                `You can't try to assassinate anyone else because you already have an assassination going on. Time left: ${msToTime(
                    Number(assasin[0].date) + 86400000 - new Date().getTime()
                )}`
            );
        }

        try {
            const keywords = await knex("keywords");

            if (keywords.length === 0)
                return message.channel.send(
                    "**Error:** There are no keyword in the database yet, use `cc!addkeyword [keyword]` to submit a new keyword. (The command works the same as the `cc!addquote` command.)"
                );
            const randomKeywordIndex = Math.floor(
                Math.random() * keywords.length
            );
            const randomKeyword = keywords[randomKeywordIndex];
            const newAssassin = {
                assasin: message.author.id,
                target: args[1],
                serverid: args[0],
                keywordid: String(randomKeyword.id),
                date: String(new Date().getTime())
            };
            await knex("assasins").insert(newAssassin);

            addAssassin(newAssassin);

            return message.channel.send(
                `✅ Your assassination has begun, you have to make your target say the word **${randomKeyword.keyword}** who was added by **${randomKeyword.username}**. You have 24h to do this starting from this moment. And don't forget if you manage to make your target say that word you were given they will lose 5% of their money, 3% of them will go to you and 2% will be lost, but if you cant manage to make your target say that word you will lose 5% of your money, 3% going to the target and 2% being lost.`
            );
        } catch (e) {
            console.log(e);
            return message.channel.send("**Error:** Internal server error.");
        }
    });
