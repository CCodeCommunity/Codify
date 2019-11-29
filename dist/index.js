"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const gears_1 = require("@enitoni/gears");
const parseArguments_1 = require("./common/parsing/middleware/parseArguments");
const constants_1 = require("./modules/constants");
const say_1 = __importDefault(require("./modules/commands/say"));
const meme_1 = __importDefault(require("./modules/commands/meme"));
const joke_1 = __importDefault(require("./modules/commands/joke"));
const adapter = new gears_discordjs_1.Adapter({ token: process.env.BOT_TOKEN || "" });
const commands = new gears_discordjs_1.CommandGroupBuilder()
    .match(gears_1.matchPrefixes(constants_1.prefix))
    .use(parseArguments_1.parseArguments)
    .setCommands(say_1.default, meme_1.default, joke_1.default)
    .done();
const bot = new gears_1.Bot({ adapter, commands: [commands] });
bot.on("error", err => console.log("Error ", err));
const init = async () => {
    await bot.start();
    console.info(`Logged in as ${bot.client.user.tag}`);
    await bot.client.user.setActivity(`Hello ${process.env.COMMUNITY}!`);
    console.info(`Set the bot's activity!`);
    console.info(`The bot is up and running!`);
};
init();
