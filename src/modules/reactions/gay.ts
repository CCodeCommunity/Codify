import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    const responses = ["gay", "gay indeed", "no u", "yes mao is gay"];

    if (message.startsWith("gay"))
        ctx.channel.send(
            responses[Math.floor(Math.random() * responses.length)]
        );
};
