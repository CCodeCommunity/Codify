"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.matchHuman = () => context => {
    const { author } = context.message;
    const matches = author instanceof discord_js_1.User && !author.bot;
    if (matches) {
        return context;
    }
};
