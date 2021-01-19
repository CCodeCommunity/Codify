import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "./help/createMetadata";

const phrases = ["your mom", "dang", "ur mom"];

const matchPhrase = (): Matcher => context => {
    const { content } = context;

    for (const message of phrases) {
        if (content.toLowerCase().includes(message)) return context;
    }

    return undefined;
};

export default new Command()
    .match(matchPhrase())
    .setMetadata(
        createMetadata({
            name: "Reactions",
            usage: "passive",
            description: "The bot will react to random messages, it's passive"
        })
    )
    .use(context => {
        const { content, message } = context;

        if (
            content.toLowerCase().includes(phrases[0]) ||
            content.toLowerCase().includes(phrases[2]) ||
            (content.toLowerCase().startsWith(phrases[1]) &&
                !content.toLowerCase().startsWith("dange"))
        ) {
            message.delete();
        }
    });
