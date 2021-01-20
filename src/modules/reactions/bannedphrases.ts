import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "../commands/help/createMetadata";

const phrases = [];

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

        if (message.guild !== null) message.delete({ timeout: 30000 });

        message.channel.send(
            `<@${message.author.id}> said something annoying, not nice. The message will be deleted in 30 seconds.`
        );

        console.log(
            message.author.username + "said a forbidden thing: " + content
        );
    });
