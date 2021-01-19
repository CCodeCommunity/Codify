import { Command, Matcher } from "@enitoni/gears-discordjs";
import { createMetadata } from "../commands/help/createMetadata";

const phrases = [
    "your mom",
    "ur mom",
    "y͎o͎u͎r͎ ͎m͎o͎m͎",
    "yuor mom",
    "r mom",
    "yer mom",
    "u mom",
    "y mom",
    "vyc gay",
    "yo mom",
    "your mother",
    "ur mother",
    "yuor mother",
    "r mother",
    "yer mother",
    "y mother",
    "vyctor gay",
    "yctor gay",
    "vyctor661 gay",
    "vy gay",
    "yur mum",
    "your_mom",
    "yer mum",
    "ban pgw",
    "ban pgn",
    "ban pga",
    "your mum",
    "ur mum",
    "yuor mum",
    "u mum",
    "y mum",
    "yo mum",
    "r mum",
    "yer_mum",
    "ur_mom",
    "yuor_mom",
    "r_mom",
    "yer_mom",
    "u_mom",
    "y_mom",
    "vyc_gay",
    "yo_mom",
    "your_mother",
    "ur_mother",
    "yuor_mother",
    "r_mother",
    "yer_mother",
    "y_mother",
    "vyctor_gay",
    "yctor_gay",
    "vyctor661_gay",
    "vy_gay",
    "yur_mum",
    "yer_mum",
    "ban_pgw",
    "ban_pgn",
    "ban_pga",
    "your_mum",
    "ur_mum",
    "yuor_mum",
    "u_mum",
    "y_mum",
    "yo_mum",
    "r_mum",
    "your-mom",
    "ur-mom",
    "yuor-mom",
    "r-mom",
    "yer-mom",
    "u-mom",
    "y-mom",
    "vyc-gay",
    "yo-mom",
    "your-mother",
    "ur-mother",
    "yuor-mother",
    "r-mother",
    "yer-mother",
    "y-mother",
    "vyctor-gay",
    "yctor-gay",
    "vyctor661-gay",
    "vy-gay",
    "yur-mum",
    "your-mom",
    "yer-mum",
    "ban-pgw",
    "ban-pgn",
    "ban-pga",
    "your-mum",
    "ur-mum",
    "yuor-mum",
    "u-mum",
    "y-mum",
    "yo-mum",
    "r-mum",
    "yer-mum"
];

const matchPhrase = (): Matcher => context => {
    const { content } = context;

    for (const message of phrases) {
        if (content.toLowerCase().includes(message)) return context;
    }

    return undefined;
};

export default new Command()
    .match(matchPhrase())
    .setMetadata(
        createMetadata({
            name: "Reactions",
            usage: "passive",
            description: "The bot will react to random messages, it's passive"
        })
    )
    .use(context => {
        const { message } = context;

        if (message.guild !== null) message.delete({ timeout: 30000 });

        message.channel.send(
            `<@${message.author.id}> said something annoying, not nice. The message will be deleted in 30 seconds.`
        );
    });
