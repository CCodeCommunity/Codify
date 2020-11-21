import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    const responses = ["trueee", "[2]", "[infinty]", "ye lmao", "^^^^"];

    if (message.startsWith("[1]"))
        ctx.channel.send(
            responses[Math.floor(Math.random() * responses.length)]
        );
};
