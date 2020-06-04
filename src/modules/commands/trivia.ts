import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import { resolveArrayToOne } from "../constants";

import he from "he";

import knex from "../../../db/knex";

import fetch from "node-fetch";

const updateBalance = async (id: string, addExtract: number) => {
    const balance = (await knex("user").where({ userid: id }))[0].balance;

    await knex("user")
        .where({ userid: id })
        .update({
            balance: parseInt(balance) + addExtract
        });
};

const getQuestion = async () => {
    const url = "https://opentdb.com/api.php?amount=1";

    const settings = { method: "Get" };

    const result = (await fetch(url, settings)).json();

    return result;
};

const shuffleArray = (array: Array<string>) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = he.decode(array[currentIndex]);
        array[currentIndex] = he.decode(array[randomIndex]);
        array[randomIndex] = temporaryValue;
    }

    return array;
};

export default new CommandBuilder()
    .match(matchPrefixesStrict("trivia"))
    .use<ParseArgumentsState>(async (context: any) => {
        const { message } = context;
        const { args } = context.state;

        message.delete();
        const data = (await getQuestion()).results[0];

        const answers =
            data.type === "boolean"
                ? ["True", "False"]
                : shuffleArray([
                      ...data.incorrect_answers,
                      data.correct_answer
                  ]);

        const indexOfCorrectAnswer = answers.lastIndexOf(
            he.decode(data.correct_answer)
        );

        const answerEmoji =
            indexOfCorrectAnswer === 0
                ? "🇦"
                : indexOfCorrectAnswer === 1
                ? "🇧"
                : indexOfCorrectAnswer === 2
                ? "🇨"
                : "🇩";

        const messageSent = await message.channel.send(
            `**Category:** ${data.category}\n**Type:** ${
                data.type
            }\n**Difficulty:** ${data.difficulty}\n**Question:** ${he.decode(
                data.question
            )}\n**Answers:**\n${
                data.type === "boolean"
                    ? `🇦 True\n🇧 False`
                    : `🇦 ${answers[0]}\n🇧 ${answers[1]}\n🇨 ${answers[2]}\n🇩 ${answers[3]}`
            }`
        );

        if (data.type === "boolean") {
            await resolveArrayToOne(messageSent).react("🇦");
            await resolveArrayToOne(messageSent).react("🇧");
        } else {
            await resolveArrayToOne(messageSent).react("🇦");
            await resolveArrayToOne(messageSent).react("🇧");
            await resolveArrayToOne(messageSent).react("🇨");
            await resolveArrayToOne(messageSent).react("🇩");
        }

        setTimeout(async () => {
            const filter = (reaction: any) =>
                reaction.emoji.name === "🇦" ||
                reaction.emoji.name === "🇧" ||
                reaction.emoji.name === "🇨" ||
                reaction.emoji.name === "🇩";

            let collector = await messageSent.createReactionCollector(filter, {
                max: 1,
                time: 60000
            });
            collector.on("collect", async (reaction: any, collected: any) => {
                const user = [...reaction.users.values()][1];
                console.log(user.username + " answered a trivia question.");

                if (reaction.emoji.name === answerEmoji) {
                    await updateBalance(
                        user.id,
                        data.difficulty === "easy"
                            ? 100
                            : data.difficulty === "medium"
                            ? 300
                            : 500
                    );
                    message.channel.send(
                        `Good job you got the correct answer! <@${user.id}>`
                    );
                } else {
                    message.channel.send(
                        `Damn that was wrong sorry. <@${user.id}>`
                    );
                }
            });
            collector.on("end", async (collected: any) => {
                if (collected.size === 0) {
                    return message.channel.send(
                        "**Nobody answered the question.** :frowning:"
                    );
                }
            });
        }, 1000);

        return;
    })
    .done();
