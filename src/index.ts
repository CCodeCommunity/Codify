import { matchPrefixes } from "@enitoni/gears";
import { Bot, Adapter, CommandGroup } from "@enitoni/gears-discordjs";

import { parseArguments } from "./common/parsing/middleware/parseArguments";
import { app, port, prefix, activity } from "./modules/constants";
import { autoXpClaim, checkSubscriptions } from "./common/knexCommon";

import a from "./modules/commands/fun/a";
import anyway from "./modules/commands/images/anyway";
import daily from "./modules/commands/fun/daily";
import description from "./modules/commands/utilities/description";
import gamble from "./modules/commands/fun/gamble";
import joke from "./modules/commands/fun/joke";
import copypasta from "./modules/commands/fun/copypasta";
import meme from "./modules/commands/fun/meme";
import pay from "./modules/commands/utilities/pay";
import profile from "./modules/commands/utilities/profile";
import say from "./modules/commands/fun/say";
import topbalance from "./modules/commands/utilities/topbalance";
import toplevel from "./modules/commands/utilities/toplevel";
import token from "./modules/commands/utilities/token";
import googleit from "./modules/commands/images/googleit";
import javaistojs from "./modules/commands/images/javaistojs";
import poll from "./modules/commands/utilities/poll";
import createWebhook from "./modules/commands/admin/createWebhook";
import addQuote from "./modules/commands/fun/addquote";
import disableLevelupMessages from "./modules/commands/utilities/disableLevelupMessages";
import trivia from "./modules/commands/fun/trivia";
import store from "./modules/commands/store/store";
import addStoreItem from "./modules/commands/admin/addStoreItem";
import buy from "./modules/commands/store/buy";
import purchases from "./modules/commands/store/purchases";
import unsubscribe from "./modules/commands/store/unsubscribe";
import removeStoreItem from "./modules/commands/admin/removeStoreItem";
import chart from "./modules/commands/images/chart";
import bannedphrases from "./modules/reactions/bannedphrases";
import { helpCommand } from "./modules/commands/help/helpCommand";
import pin from "./modules/commands/admin/pin";
import setpinchannel from "./modules/commands/admin/setpinchannel";
import topxptoday from "./modules/commands/utilities/topxptoday";
import servertime from "./modules/commands/utilities/servertime";
import addassasinationkeyword from "./modules/commands/fun/addassasinationkeyword";
import assassinate from "./modules/commands/fun/assassinate";
import assassinations from "./modules/reactions/assassinations";
import optoutofassassinations from "./modules/commands/fun/optoutofassassinations";
import xmas from "./modules/commands/fun/xmas";
import age from "./modules/commands/utilities/age";
import ban from "./modules/commands/admin/ban";
import kick from "./modules/commands/admin/kick";
import unban from "./modules/commands/admin/unban";
import setWelcomeChannelId from "./modules/commands/admin/setWelcomeChannelId";
import toggleQuotes from "./modules/commands/admin/toggleQuotes";
import setAuditChannel from "./modules/commands/admin/setAuditChannel";
import { Intents } from "discord.js";
import { welcomeEventsInitialiser } from "./modules/reactions/welcomemessages";

const intents = new Intents();

intents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS
);

const adapter = new Adapter({
    token: process.env.BOT_TOKEN || "",
    intents
});

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
        addassasinationkeyword,
        meme,
        toplevel,
        createWebhook,
        poll,
        age,
        trivia,
        xmas,
        assassinate,
        disableLevelupMessages,
        toggleQuotes,
        token,
        googleit,
        addQuote,
        ban,
        unban,
        kick,
        setWelcomeChannelId,
        setAuditChannel,
        topbalance,
        joke,
        optoutofassassinations,
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

export const bot = new Bot({
    adapter,
    commands: [commands, bannedphrases, assassinations]
});

bot.on("error", (err) => console.log("Error ", err));

bot.client.on("messageCreate", (ctx) => {
    if (ctx.author.bot) {
        return;
    }

    autoXpClaim(ctx.author.id, ctx);
    checkSubscriptions(ctx.author.id, bot.client);
});

welcomeEventsInitialiser(bot.client);

const init = async (): Promise<void> => {
    console.info(`Connecting to discord...`);
    await bot.start();
    console.info(`Logged in as ${bot.client.user!.tag}`);

    await bot.client.user!.setActivity(activity());
    console.info(`Bot activity is set up!`);

    setInterval(() => {
        bot.client.user!.setActivity(activity());

        console.info("Bot activity updated!");
    }, 6 * 60 * 60 * 1000);

    console.info(`The bot is up and running!`);
};

app.listen(port, init);
