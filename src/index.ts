import { Adapter, CommandGroupBuilder } from "@enitoni/gears-discordjs";
import { matchPrefixes, Bot } from "@enitoni/gears";

import { parseArguments } from "./common/parsing/middleware/parseArguments";
import { prefix , port } from "./modules/constants";

const express = require("express");
const app = express();

import say from "./modules/commands/say";
import meme from "./modules/commands/meme";
import joke from "./modules/commands/joke";

const adapter = new Adapter({ token: process.env.BOT_TOKEN || "" });

const commands = new CommandGroupBuilder()
    .match(matchPrefixes(prefix))
    .use(parseArguments)
    .setCommands(say,meme,joke)
    .done();

const bot = new Bot({ adapter, commands: [commands] });

bot.on("error", err => console.log("Error ", err));

const init = async (): Promise<void> => {
    await bot.start();
    console.info(`Logged in as ${bot.client.user.tag}`);

    await bot.client.user.setActivity(`Hello ${process.env.COMMUNITY}!`);
    console.info(`Set the bot's activity!`);

    console.info(`The bot is up and running!`);
};

app.listen(port, init());
