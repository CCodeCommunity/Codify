import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";

import fetch from "node-fetch";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

let loopIt = 0;

/*
    TODO:
    - Deal with the loop thing below, it's very bad.
    - Deal with posts with post_hint = "image" cuz they make the image to not show.
*/

const loop = (type: "url" | "title" | "score") => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};

export default new Command()
    .match(matchPrefixesStrict("meme"))
    .setMetadata(
        createMetadata({
            name: "Meme",
            usage: "cc!meme <subreddit>",
            description:
                "Sends a random meme from a subreddit. The default is set to r/ProgrammerHumor. Sometimes it doesn't work because the meme it got was from either an external source or a video/gif"
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>(async context => {
        const { args } = context.state;
        let subreddit = "ProgrammerHumor";
        if (args.length) {
            subreddit = args.join("");
        }
        try {
            const response = await fetch(
                `https://www.reddit.com/r/${subreddit}/hot/.json`
            );
            const data = await response.json();

            logEvent(
                `<@${context.message.author.id}> has used this command and fetched a meme from _${subreddit}_.`,
                context
            );

            return context.message.channel.send({
                embed: {
                    color: 3447003,
                    title: `${data.data.children[loop("title")].data.title}`,
                    url: `https://www.reddit.com${
                        data.data.children[loop("url")].data.permalink
                    }`,

                    image: {
                        url: `${data.data.children[loop("url")].data.url}`
                    },

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
            return context.message.channel.send(
                "**Error:** Internal server error."
            );
        }
    });
