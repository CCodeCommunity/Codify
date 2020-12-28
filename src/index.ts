import { matchPrefixes } from "@enitoni/gears";
import { Bot, Adapter, CommandGroup } from "@enitoni/gears-discordjs";

import { parseArguments } from "./common/parsing/middleware/parseArguments";
import { app, port, prefix } from "./modules/constants";
import { autoXpClaim, checkSubscriptions } from "./common/knexCommon";

import a from "./modules/commands/a";
import anyway from "./modules/commands/anyway";
import daily from "./modules/commands/daily";
import description from "./modules/commands/description";
import gamble from "./modules/commands/gamble";
import joke from "./modules/commands/joke";
import copypasta from "./modules/commands/copypasta";
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
import store from "./modules/commands/store";
import addStoreItem from "./modules/commands/addStoreItem";
import buy from "./modules/commands/buy";
import purchases from "./modules/commands/purchases";
import unsubscribe from "./modules/commands/unsubscribe";
import removeStoreItem from "./modules/commands/removeStoreItem";
import chart from "./modules/commands/chart";
import reactions from "./modules/commands/reaction";
import { helpCommand } from "./modules/commands/help/helpCommand";
import pin from "./modules/commands/pin";
import setpinchannel from "./modules/commands/setpinchannel";
import topxptoday from "./modules/commands/topxptoday";
import servertime from "./modules/commands/servertime";

const adapter = new Adapter({ token: process.env.BOT_TOKEN || "" });

const commands = new CommandGroup()
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
        topxptoday,
        copypasta,
        pay,
        anyway,
        chart,
        a,
        addStoreItem,
        removeStoreItem,
        servertime,
        store,
        buy,
        pin,
        setpinchannel,
        purchases,
        unsubscribe,
        helpCommand
    );

const bot = new Bot({ adapter, commands: [commands, reactions] });

bot.on("error", err => console.log("Error ", err));

bot.client.on("message", ctx => {
    if (ctx.author.bot) {
        return;
    }
    autoXpClaim(ctx.author.id, ctx);
    checkSubscriptions(ctx.author.id, bot.client);
});

const init = async (): Promise<void> => {
    console.info(`Connecting to discord...`);
    await bot.start();
    console.info(`Logged in as ${bot.client.user!.tag}`);

    await bot.client.user!.setActivity(`🚰 Drinking water!`);
    console.info(`Bot activity is set up!`);

    console.info(`The bot is up and running!`);
};

app.listen(port, init);
