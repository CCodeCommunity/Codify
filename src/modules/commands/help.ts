import { CommandBuilder } from "@enitoni/gears-discordjs";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("help|cmds|commands")) /// If you change command prefix also change it in matchPrefixesStrict.ts or you'll break things
    .use(context => {
        const { message } = context;
        return message.channel.send({
            embed: {
                description: "**List of commands for @Codify**",
                color: 3447003,
                footer: {
                    text:
                        "Please use this bot only in #spam and  do not abuse it."
                },
                fields: [
                    {
                        name: "\`cc!help / cc!cmds / cc!commands\`",
                        value:
                            "List all the commands for the discord bot. Basically what you are seeing right now."
                    },
                    {
                        name: "\`cc!say [text]\`",
                        value: "@Codify will say whatever you want."
                    },
                    {
                        name: "\`cc!meme [subreddit](optional)\`",
                        value:
                            "Use this for memes, the default subreddit is programmerHumour but you can choose other subreddits as well. ***WARING:*** *Using nsfw subreddits will result in a kick or a ban*"
                    },
                    {
                        name: "\`cc!joke\`",
                        value:
                            "Use this for seeing jokes from r/jokes. **Disclaimer:** The subreddit is full of bad jokes lol."
                    },
                    {
                        name: "\`cc!dbtest [text]\`",
                        value:
                            "This command will store a message in the bot's database. Use \`cc!dbtest\` to get the message back from the database. This command is temporary and it was set for testing our bot's database."
                    }
                ]
            }
        });
    })
    .done();
