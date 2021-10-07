import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import jimp from "jimp";
import { MessageAttachment } from "discord.js";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/parsing/middleware/comandCooldown";

async function manipulateImage(title: string, white: string, black: string) {
    const image = await jimp.read("src/common/images/thechart.png");
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    image.print(font, 300 - jimp.measureText(font, title) / 2, 300, title);
    image.print(
        font,
        160 -
            (jimp.measureText(font, black) > 150
                ? 150
                : jimp.measureText(font, black)),
        240 - jimp.measureTextHeight(font, black, 150),
        {
            text: black,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
        },
        150
    );
    image.print(
        font,
        440,
        170 - jimp.measureTextHeight(font, white, 200),
        white,
        200
    );

    image.write("src/common/images/thechartManipulated.jpg");
}

export default new Command()
    .match(matchPrefixesStrict("chart"))
    .setMetadata(
        createMetadata({
            name: "Chart",
            usage: "cc!chart [title] | [white side] | [black side]",
            description:
                "Sends a chart comparing the white amount to the black amount. It's an inside server joke, the original chart showed distribution of black vs white people based on iq"
        })
    )
    .use<Cooldown>((context, next) => {
        setCooldown(context, next, 15000);
    })
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const rawArgs = context.state.args;

        if (message.guild !== null) message.delete();

        const args = rawArgs
            .join(" ")
            .split("|")
            .map(l => l.trim());

        if (!args[0]) {
            return message.channel.send(
                `:x: **OOPS**, you need to enter the title of the graph.`
            );
        }

        if (!args[1]) {
            return message.channel.send(
                `:x: **OOPS**, you need to enter the white side of the graph.`
            );
        }

        if (!args[2]) {
            return message.channel.send(
                `:x: **OOPS**, you need to enter the black side of the graph.`
            );
        }

        await manipulateImage(args[0], args[1], args[2]);
        const attachment = new MessageAttachment(
            `src/common/images/thechartManipulated.jpg`
        );
        return message.channel.send(attachment);
    });
