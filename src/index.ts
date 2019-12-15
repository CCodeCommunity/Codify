import { Adapter, CommandGroupBuilder } from "@enitoni/gears-discordjs";
import { matchPrefixes, Bot } from "@enitoni/gears";

import { parseArguments } from "./common/parsing/middleware/parseArguments";
import { prefix, port, app } from "./modules/constants";

import say from "./modules/commands/say";
import meme from "./modules/commands/meme";
import joke from "./modules/commands/joke";
import dbtest from "./modules/commands/database test";

const adapter = new Adapter({ token: process.env.BOT_TOKEN || "" });

const commands = new CommandGroupBuilder()
    .match(matchPrefixes(prefix))
    .use(parseArguments)
    .setCommands(say, meme, joke, dbtest)
    .done();

const bot = new Bot({ adapter, commands: [commands] });

bot.on("error", err => console.log("Error ", err));

const init = async (): Promise<void> => {
    console.info(`Connecting to discord...`);
    await bot.start();
    console.info(`Logged in as ${bot.client.user.tag}`);

    await bot.client.user.setActivity(`Hello ${process.env.COMMUNITY}!`);
    console.info(`Bot activity is set up!`);

    console.info(`The bot is up and running!`);
};

app.listen(port, init);
