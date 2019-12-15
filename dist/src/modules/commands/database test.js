"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const matchPrefixesStrict_1 = require("../../common/matching/matchPrefixesStrict");
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = require("../../../knexfile");
const knex = knex_1.default(knexfile_1.production);
async function insertMessage(id, message) {
    knex("testtable")
        .where({ userid: id })
        .then(async (rows) => {
        if (rows.length === 0) {
            await knex("testtable").insert({
                userid: id,
                usermessage: message
            });
        }
        else {
            await knex("testtable")
                .where({ userid: id })
                .update({ usermessage: message });
        }
    });
}
function pullMessage(id) {
    return knex("testtable")
        .where("userid", id)
        .then(data => data[0].usermessage);
}
exports.default = new gears_discordjs_1.CommandBuilder()
    .match(matchPrefixesStrict_1.matchPrefixesStrict("dbtest"))
    .use(async (context) => {
    const { message } = context;
    const { args } = context.state;
    if (args.length) {
        await insertMessage(message.author.id, args.join(" "));
        if (args.length < 1800) {
            return message.channel.send(`Error: Your message is too long.`);
        }
        else {
            return message.channel.send(`Your message was registered in the database.`);
        }
    }
    else {
        try {
            return message.channel.send(`Your message was: ${await pullMessage(message.author.id)}`);
        }
        catch (e) {
            return message.channel.send(`Error: Cannot retrieve message from database.`);
        }
    }
})
    .done();
