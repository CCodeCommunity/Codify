import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("googleit"))
    .use(context => {
        const { message } = context;

        return message.channel.send("", {
            file: "src/common/images/googleit.png"
        });
    })
    .done();
