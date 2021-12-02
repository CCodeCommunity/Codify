import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

const timeTillChristmas = (year: number): string => {
    const today = new Date();

    const xmas = new Date(`December 25, ${year}`);
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeLeft = xmas.getTime() - today.getTime();

    const eDaysLeft = timeLeft / msPerDay;
    const daysLeft = Math.floor(eDaysLeft);
    const eHrsLeft = (eDaysLeft - daysLeft) * 24;
    const hrsLeft = Math.floor(eHrsLeft);
    const minsLeft = Math.floor((eHrsLeft - hrsLeft) * 60);

    if (daysLeft === 0)
        return ":santa_tone1::snowflake: :santa_tone1: **IT IS CHRISTMASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS** :santa_tone1::snowflake: :santa_tone1:";
    if (daysLeft < 0) return timeTillChristmas(year + 1);
    if (daysLeft > 0)
        return `**There are ${daysLeft} days ${hrsLeft} hours ${minsLeft} minutes left until Christmas** :santa_tone1:`;
    return "error";
};

export default new Command()
    .match(matchPrefixesStrict("xmas"))
    .setMetadata(
        createMetadata({
            name: "Till Xmas",
            usage: "cc!xmas",
            description: "Days left until Christmas"
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(context => {
        const { message } = context;

        if (message.guild !== null) message.delete();

        return message.channel.send(
            `${timeTillChristmas(new Date().getFullYear())}`
        );
    });
