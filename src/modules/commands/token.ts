import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import { randomBytes } from "crypto";

import knex from "../../../knexfile";

export default new CommandBuilder()
    .match(matchPrefixesStrict("gettoken"))
    .use(async context => {
        const { message } = context;
        const token = randomBytes(16).toString("hex");

        await knex("user")
            .where({ userid: message.author.id })
            .update({
                token
            });

        return message.author.send(`
        Your token is: \`${token}\`, make sure ***NOBODY*** else knows this token because they will be able to access your Codify profile through the API.\n
        To access the API you just go to \`https://codify-api.herokuapp.com/user/<YOUR DISCORD USER ID HERE>/<YOUR TOKEN HERE>\`.\n
        Add \`/bet\` to your path to get info for the bet command in the API. Add \`/bet/<amount>\` to start betting (Use a GET method).\n
        Maybe I will add more API commands in the future.
        If your tokem gets compromised just use \`cc!gettoken\` again to generate another token.
        `);
    })
    .done();
