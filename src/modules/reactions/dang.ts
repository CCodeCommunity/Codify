import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    const responses = ["danggggg", "bruh", "not worthy of my dang", "[1]"];

    if (message.startsWith("dang") || message.includes(" dang"))
        ctx.channel.send(
            responses[Math.floor(Math.random() * responses.length)]
        );
};
