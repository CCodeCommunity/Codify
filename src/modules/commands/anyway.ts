import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import jimp from "jimp";
import { MessageAttachment } from "discord.js";
import { createMetadata } from "./help/createMetadata";

async function manipulateImage(text: string) {
    const image = await jimp.read("src/common/images/anyway.jpg");
    const font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
    image.print(font, 600, 625, text);

    image.write("src/common/images/anywayManipulated.jpg");
}

export default new Command()
    .match(matchPrefixesStrict("anyway|anyways"))
    .setMetadata(
        createMetadata({
            name: "Anyway",
            usage: "cc!anyway/cc!anyways [text]",
            description:
                'Sends an image with Danny Devito that says "So anyway I started [text]"'
        })
    )
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        message.delete();

        if (!args.length) {
            return message.channel.send(
                `Please enter some text: \`cc!anyway [text]\``
            );
        }

        if (args.join(" ").length < 20) {
            await manipulateImage(args.join(" "));
            const attachment = new MessageAttachment(
                `src/common/images/anywayManipulated.jpg`
            );
            return message.channel.send(attachment);
        } else {
            return message.channel.send(`**ERROR:** Input text is too long.`);
        }
    });
