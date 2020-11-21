import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    if (message.startsWith("bruh") || message.includes(" bruh"))
        ctx.channel.send("bruh");
};
