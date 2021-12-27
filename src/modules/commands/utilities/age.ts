import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

import { ymwdhms } from "../../constants";

export default new Command()
    .match(matchPrefixesStrict("age"))
    .setMetadata(
        createMetadata({
            name: "Age",
            usage: "cc!age",
            description: "Displays the age of the server or of your account."
        })
    )
    .use<Cooldown>(setCooldown(10000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        if (message.guild == null) {
            return message.channel.send(
                `**Your account was created on:** **\`${String(
                    message.author.createdAt
                )}\`** \n**That means that your account is:** **\`${ymwdhms(
                    new Date().getTime() - message.author.createdAt.getTime()
                )}\`** **old**`
            );
        }
        return message.channel.send(
            `**This server was created on:** **\`${String(
                message.guild?.createdAt
            )}\`** \n**That means that the server is:** **\`${ymwdhms(
                new Date().getTime() - message.guild?.createdAt.getTime()
            )}\`** **old**`
        );
    });
