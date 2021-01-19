import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import { createMetadata } from "./help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("servertime"))
    .setMetadata(
        createMetadata({
            name: "Servertime",
            usage: "cc!servertime",
            description: "Shows the bot's time, aka the server time."
        })
    )
    .use<ParseArgumentsState>(context => {
        const { message } = context;

        if (message.guild !== null) message.delete();

        return message.channel.send(
            `${new Date().toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })} GMT`
        );
    });
