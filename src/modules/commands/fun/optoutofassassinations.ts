import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import knex from "../../../../db/knex";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import User from "../../../common/types/User";

async function insertData(userid: string) {
    const assassin = (await knex<User>("user").where({ userid }))[0].assassin;
    await knex("user")
        .where({ userid })
        .update({ assassin: !assassin });
    return assassin;
}

export default new Command()
    .match(matchPrefixesStrict("optoutofassassinations|oooa"))
    .setMetadata(
        createMetadata({
            name: "Opt out of the assassinations minigame.",
            usage: "cc!optoutofassassinations/oooa",
            description:
                "If you want to opt out of the assassinations minigame, you can use this command, nobody will be able to assassinate you, at the cost of you not being able to assassinate anyone."
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        try {
            const isDisabled = await insertData(message.author.id);
            return message.channel.send(
                `**Succesfully ${
                    isDisabled ? "opted out of" : "opted in"
                } the assassinations minigame.**`
            );
        } catch (e) {
            console.info(e);
            return message.channel.send(`**ERROR:** Something went wrong.`);
        }
    });
