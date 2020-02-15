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
        Your token is: \`${token}\`, make sure **nobody** else knows this token because with it they will be able to access your Codify profile through the API as if they were you.\n\nTo bet using the API, send a POST request to \`https://codify-api.herokuapp.com/api/bet/\`.\nThe POST request body should look like this: \n\`\`\`json\n{\n    "id": ${message.author.id},\n    "token": ${token},\n    "amount": 42\n}\n\`\`\`\n\nIf your token gets compromised, use \`cc!gettoken\` again to regenerate the token.\nBest of luck! :grinning:`);
    })
    .done();
