import { Message } from "discord.js";

export default (ctx: Message) => {
    const message = ctx.content;

    const responses = ["danggggg", "dangg", "dangggggggggggggggggg"];

    if (message.startsWith("dang"))
        ctx.channel.send(
            responses[Math.floor(Math.random() * responses.length)]
        );
};
