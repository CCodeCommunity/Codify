import { CommandBuilder } from "@enitoni/gears-discordjs";
import { matchPrefixes } from "@enitoni/gears";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";

import fetch from "node-fetch";

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
}


export default new CommandBuilder()
    .match(matchPrefixes("meme"))
    .use<ParseArgumentsState>(async context => {
        const { args } = context.state;
        let subreddit = "ProgrammerHumor";
        if(args.length){
            subreddit = args.join("");
        }
        try {
            let response = await fetch(`https://www.reddit.com/r/${subreddit}/hot/.json`);
            let data = await response.json();
            

            return context.message.channel.send(
                {
                    embed: {
                        color: 3447003,
                        title: `${data.data.children[loop("title")].data.title}`,
                        url: `https://www.reddit.com${data.data.children[loop("url")].data.permalink}`,

                        image:{
                            url: `${data.data.children[loop("url")].data.url}`
                        },
                        
                        footer: {
                            text: `👍 ${data.data.children[loop("score")].data.score} | 💬 ${data.data.children[loop("score")].data.num_comments}`
                        }
                    }
                }
            );
        } catch (e) {
            return context.message.channel.send(e)
        }
    })
    .done();
