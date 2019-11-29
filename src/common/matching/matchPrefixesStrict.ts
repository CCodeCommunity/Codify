import { Matcher } from "@enitoni/gears-discordjs";

const symbols = ["-", "."] as const;

export const matchPrefixesStrict = (
    ...keywords: string[]
): Matcher => context => {
    const regex = new RegExp(
        `^(${keywords.join("|")})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join(
            "|"
        )})*$`,
        "i"
    );

    const isMatching = !!context.content.match(regex);
    if (!isMatching) {
        return;
    }

    const newContent = context.content.replace(regex, "").trim();

    return { ...context, content: newContent };
};
