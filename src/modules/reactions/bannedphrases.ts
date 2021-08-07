import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "../commands/help/createMetadata";

const phrases = ["75849578657459"];

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
    .use(async context => {
        const { content, message } = context;

        if (message.guild !== null) message.delete({ timeout: 5000 });

        message.channel.send(
            `<@${message.author.id}> wow nice easter egg, I wonder what the number means.`
        );

        console.log(
            message.author.username + "said a forbidden thing: " + content
        );
    });
