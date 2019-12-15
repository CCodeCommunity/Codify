"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols = ["-", "."];
exports.matchPrefixesStrict = (...keywords) => context => {
    const regex = new RegExp(`^(${keywords.join("|")})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join("|")})*$`, "i");
    const isMatching = !!context.content.match(regex);
    if (!isMatching) {
        return;
    }
    const newContent = context.content.replace(regex, "").trim();
    return { ...context, content: newContent };
};
