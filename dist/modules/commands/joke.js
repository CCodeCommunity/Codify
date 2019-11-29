"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const gears_1 = require("@enitoni/gears");
const node_fetch_1 = __importDefault(require("node-fetch"));
let loopIt = 0;
const loop = (type) => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};
exports.default = new gears_discordjs_1.CommandBuilder()
    .match(gears_1.matchPrefixes("joke"))
    .use(async (context) => {
    try {
        let response = await node_fetch_1.default(`https://www.reddit.com/r/Jokes/hot/.json`);
        let data = await response.json();
        return context.message.channel.send({
            embed: {
                color: 3447003,
                title: `${data.data.children[loop("title")].data.title}`,
                description: `${data.data.children[loop("content")].data.selftext}`,
                footer: {
                    text: `👍 ${data.data.children[loop("score")].data.score} | 💬 ${data.data.children[loop("score")].data.num_comments}`
                }
            }
        });
    }
    catch (e) {
        return context.message.channel.send(e);
    }
})
    .done();
