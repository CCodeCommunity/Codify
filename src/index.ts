import { Bot, matchPrefixes } from "@enitoni/gears";
import { Adapter, CommandGroupBuilder } from "@enitoni/gears-discordjs";

import { parseArguments } from "./common/parsing/middleware/parseArguments";
import { app, port, prefix } from "./modules/constants";
import { autoXpClaim } from "./common/knexCommon";

import a from "./modules/commands/a";
import anyway from "./modules/commands/anyway";
import daily from "./modules/commands/daily";
import description from "./modules/commands/description";
import gamble from "./modules/commands/gamble";
import help from "./modules/commands/help";
import joke from "./modules/commands/joke";
import meme from "./modules/commands/meme";
import pay from "./modules/commands/pay";
import profile from "./modules/commands/profile";
import say from "./modules/commands/say";
import topbalance from "./modules/commands/topbalance";
import toplevel from "./modules/commands/toplevel";
import token from "./modules/commands/token";
import googleit from "./modules/commands/googleit";
import javaistojs from "./modules/commands/javaistojs";
import poll from "./modules/commands/poll";
import createWebhook from "./modules/commands/createWebhook";
import addQuote from "./modules/commands/addquote";
import disableLevelupMessages from "./modules/commands/disableLevelupMessages";
import trivia from "./modules/commands/trivia";

const adapter = new Adapter({ token: process.env.BOT_TOKEN || "" });

const commands = new CommandGroupBuilder()
    .match(matchPrefixes(prefix))
    .use(parseArguments)
    .setCommands(
        description,
        profile,
        say,
        daily,
        gamble,
        javaistojs,
        meme,
        toplevel,
        createWebhook,
        poll,
        trivia,
        disableLevelupMessages,
        token,
        googleit,
        addQuote,
        topbalance,
        joke,
        pay,
        anyway,
        a,
        help
    ) // / Make sure help is the last command or it will break things.
    .done();

const bot = new Bot({ adapter, commands: [commands] });

bot.on("error", err => console.log("Error ", err));

bot.client.on("message", ctx => {
    if (ctx.author.bot) {
        return;
    }
    autoXpClaim(ctx.author.id, ctx);
});

const init = async (): Promise<void> => {
    console.info(`Connecting to discord...`);
    await bot.start();
    console.info(`Logged in as ${bot.client.user.tag}`);

    await bot.client.user.setActivity(`🚰 Drinking water!`);
    console.info(`Bot activity is set up!`);

    console.info(`The bot is up and running!`);
};

app.listen(port, init);
