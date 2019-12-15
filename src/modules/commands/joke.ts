import { CommandBuilder } from "@enitoni/gears-discordjs";
import { matchPrefixes } from "@enitoni/gears";

import fetch from "node-fetch";

let loopIt = 0;

const loop = (type: "content" | "title" | "score") => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};

export default new CommandBuilder()
    .match(matchPrefixes("joke"))
    .use(async context => {
        try {
            const response = await fetch(
                `https://www.reddit.com/r/Jokes/hot/.json`
            );
            const data = await response.json();

            return context.message.channel.send({
                embed: {
                    color: 3447003,
                    title: `${data.data.children[loop("title")].data.title}`,
                    description: `${
                        data.data.children[loop("content")].data.selftext
                    }`,

                    footer: {
                        text: `👍 ${
                            data.data.children[loop("score")].data.score
                        } | 💬 ${
                            data.data.children[loop("score")].data.num_comments
                        }`
                    }
                }
            });
        } catch (e) {
            return context.message.channel.send(e);
        }
    })
    .done();
