"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const matchPrefixesStrict_1 = require("../../common/matching/matchPrefixesStrict");
exports.default = new gears_discordjs_1.CommandBuilder()
    .match(matchPrefixesStrict_1.matchPrefixesStrict("say"))
    .use(context => {
    const { message } = context;
    const { args } = context.state;
    if (!args.length) {
        return message.channel.send(`**${message.author.username}** said nothing`);
    }
    return message.channel.send(`**${message.author.username}** said:\n${args.join(" ")}`);
})
    .done();
