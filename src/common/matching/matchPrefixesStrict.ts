import { Matcher } from "@enitoni/gears-discordjs";

const symbols = ["-", "."] as const;

export const matchPrefixesStrict =
    (...keywords: string[]): Matcher =>
    async (context) => {
        const regex = new RegExp(
            `^(${keywords.join(
                "|"
            )})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join("|")})*$`,
            "i"
        );

        const isMatching =
            !!context.content.match(regex) && !context.message.author.bot;

        if (keywords[0] === "help" && !context.message.author.bot) {
            context.message.delete();
            const newMessage = await context.message.channel.send(
                `**Invalid command!**`
            );
            setTimeout(() => {
                newMessage.delete();
            }, 3000);
        }

        if (!isMatching) return;

        if (context.message.channel.type !== "DM") {
            setTimeout(() => {
                context.message.delete();
            }, 1000);
        }

        const newContent = context.content.replace(regex, "").trim();

        return { ...context, content: newContent };
    };
