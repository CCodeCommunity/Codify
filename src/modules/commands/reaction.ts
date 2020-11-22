import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "./help/createMetadata";

const phrases = ["bruh", "dang", "^", "[1]", "gay"];

const matchPhrase = (): Matcher => context => {
    const { content } = context;

    for (const message of phrases) {
        if (content.toLowerCase().startsWith(message)) return context;
    }

    return undefined;
};

export default new Command()
    .match(matchPhrase())
    .setMetadata(
        createMetadata({
            name: "Reactions",
            usage: "passive",
            description: "The bot will react to random messages, it's passive."
        })
    )
    .use(context => {
        const { content, message } = context;
        // const bruhResponses = ["bruh indeeed", "bruh", "lmao", "wow"];
        const dangResponses = [
            "danggggg",
            "dangg",
            "dan",
            "ok you can stop saying dang"
        ];
        // const plusoneResponses = [
        //     "trueee",
        //     "[2]",
        //     "[infinty]",
        //     "ye lmao",
        //     "^^^^"
        // ];
        // const gayResponses = ["yep", "gay indeed", "no u", "mao is gay"];

        // if (content.toLowerCase().startsWith(phrases[0]))
        //     return message.channel.send(
        //         bruhResponses[Math.floor(Math.random() * bruhResponses.length)]
        //     );
        if (content.toLowerCase().startsWith(phrases[1]))
            return message.channel.send(
                dangResponses[Math.floor(Math.random() * dangResponses.length)]
            );
        // if (
        //     content.toLowerCase().startsWith(phrases[2]) ||
        //     content.toLowerCase().startsWith(phrases[3])
        // )
        //     return message.channel.send(
        //         plusoneResponses[
        //             Math.floor(Math.random() * plusoneResponses.length)
        //         ]
        //     );
        // if (content.toLowerCase().startsWith(phrases[4]))
        //     return message.channel.send(
        //         gayResponses[Math.floor(Math.random() * gayResponses.length)]
        //     );
    });
