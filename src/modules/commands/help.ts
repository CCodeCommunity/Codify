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
                        name: "`cc!help / cc!cmds / cc!commands`",
                        value:
                            "List all the commands for the discord bot. Basically what you are seeing right now.",
                        inline: true
                    },
                    {
                        name: "`cc!say [text]`",
                        value: "@Codify will say whatever you want.",
                        inline: true
                    },
                    {
                        name: "`cc!meme <subreddit>`",
                        value:
                            "Use this for memes, the default subreddit is programmerHumour but you can choose other subreddits as well. ***WARING:*** *Using nsfw subreddits will result in a kick or a ban*",
                        inline: true
                    },
                    {
                        name: "`cc!joke`",
                        value:
                            "Use this for seeing jokes from r/jokes. **Disclaimer:** The subreddit is full of bad jokes lol.",
                        inline: true
                    },
                    // {
                    //     name: "`cc!challenge`",
                    //     value:
                    //         "Run this command to get a coding challenge, just try to make what it says lol."
                    // },
                    {
                        name: "`cc!anyway [text]`",
                        value:
                            "So anyway I started [text]. The better if you know the meme.",
                        inline: true
                    },
                    {
                        name: "`cc!profile <user>`",
                        value:
                            "Use this to see your profile or someone else's profile. You can set a description too.",
                        inline: true
                    },
                    {
                        name: "`cc!desc [description]`",
                        value:
                            "Use this command to set a description to show on your profile :)",
                        inline: true
                    },
                    {
                        name: "`cc!daily`",
                        value: "Claim your daily reward with this command.",
                        inline: true
                    },
                    {
                        name: "`cc!gamble [amount]`",
                        value:
                            "Use this to gamble, cuz virtual free gambling is fun.",
                        inline: true
                    },
                    {
                        name: "`cc!pay [user]`",
                        value: "Use ths command to send a user some money.",
                        inline: true
                    },
                    {
                        name: "`cc!top`",
                        value: "Use this command to see the top users by xp.",
                        inline: true
                    },
                    {
                        name: "`cc!topb`",
                        value:
                            "Use this command to get the top balance of all users.",
                        inline: true
                    },
                    {
                        name: "`cc!googleit`",
                        value: "Useful to use when some noob asks a noob question",
                        inline: true
                    },
                    {
                        name: "`cc!javaistojs`",
                        value: "Java is to javascript as ham is to hamster.",
                        inline: true
                    }, {
                        name: "`cc!poll [Question] | [Option 1] | <Option 2> ...`",
                        value: "This command creates a poll with up to 20 options, you need to have a question and at least one option, the question and the options are separated by the \"|\"",
                        inline: true
                    }, {
                        name: "`cc!webhook`",
                        value: "This command will automatically create a webhook and the link will be DMed to the one who used the command. One can only use the command if he has the `githubHooker` role.",
                        inline: true
                    }
                ]
            }
        });
    })
    .done();
