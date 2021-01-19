import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "./help/createMetadata";

const phrases = [
    "your mom",
    "ur mom",
    "y͎o͎u͎r͎ ͎m͎o͎m͎",
    "yuor mom",
    "r mom",
    "yer mom",
    "u mom",
    "y mom"
];

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
        const { message } = context;

        message.delete();

        message.channel.send(`<@${message.author.id}> is gay.`);
    });
