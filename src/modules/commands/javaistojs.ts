import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("javaistojs|javatojs"))
    .use(context => {
        const { message } = context;

        message.delete();
        return message.channel.send("", {
            file: "src/common/images/javaistojs.png"
        });
    })
    .done();
