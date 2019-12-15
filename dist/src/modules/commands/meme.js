"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const gears_1 = require("@enitoni/gears");
const node_fetch_1 = __importDefault(require("node-fetch"));
let loopIt = 0;
/*
    TODO:
    - Deal with the loop thing below, it's very bad.
    - Deal with posts with post_hint = "image" cuz they make the image to not show.
*/
const loop = (type) => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};
exports.default = new gears_discordjs_1.CommandBuilder()
    .match(gears_1.matchPrefixes("meme"))
    .use(async (context) => {
    const { args } = context.state;
    let subreddit = "ProgrammerHumor";
    if (args.length) {
        subreddit = args.join("");
    }
    try {
        let response = await node_fetch_1.default(`https://www.reddit.com/r/${subreddit}/hot/.json`);
        let data = await response.json();
        return context.message.channel.send({
            embed: {
                color: 3447003,
                title: `${data.data.children[loop("title")].data.title}`,
                url: `https://www.reddit.com${data.data.children[loop("url")].data.permalink}`,
                image: {
                    url: `${data.data.children[loop("url")].data.url}`
                },
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
