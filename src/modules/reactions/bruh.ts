import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    const responses = ["bruh indeeed", "bruh", "lmao", "kinda gay ngl"];

    if (message.startsWith("bruh"))
        ctx.channel.send(
            responses[Math.floor(Math.random() * responses.length)]
        );
};
