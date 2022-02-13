import { Command, Matcher } from "@enitoni/gears-discordjs";
import knex from "../../../db/knex";
import User from "../../common/types/User";

type Assassin = {
    assasin: string;
    target: string;
    serverid: string;
    keywordid: string;
    date: string;
};
type Assassins = Array<Assassin>;

type Keyword = { keyword: string; username: string; id: number };
type Keywords = Array<Keyword>;

let keywords: Keywords = [];
let assassins: Assassins = [];

export const initKeywords = async () => {
    const keywordsRaw = (await knex("keywords")) as Keywords;

    keywords = keywordsRaw;
};
const initAssassins = async () => {
    const assassinsRaw = (await knex("assasins")) as Assassins;
    assassins = assassinsRaw;
};

export const addAssassin = (assassin: Assassin) => {
    assassins.push(assassin);
};

const checkAssassination = (): Matcher => async (context) => {
    const { content, message } = context;

    if (keywords.length === 0) await initKeywords();
    if (assassins.length === 0) await initAssassins();

    const failedAssa = assassins.filter(
        (value) =>
            value.target === message.author.id &&
            Number(value.date) + 86400000 < new Date().getTime()
    );

    for (const assa of failedAssa) {
        // Failed assassinatinos here, delete from database and transfer the money
        const assassinProfile = (await knex("user")
            .where({
                userid: assa.assasin
            })
            .first()) as User;
        const targetProfile = (await knex("user")
            .where({ userid: assa.target })
            .first()) as User;

        if (assassinProfile && targetProfile) {
            (await message.client.users.fetch(assa.assasin))?.send(
                `💀 Your assassination attempt has failed, and you have lost **5% (${Math.floor(
                    (5 / 100) * assassinProfile.balance
                )})** of your money, of which **3% (${Math.floor(
                    (3 / 100) * assassinProfile.balance
                )})** will go to your target <@${assa.target}>.`
            );
            (await message.client.users.fetch(assa.target))?.send(
                `😎 <@${
                    assa.assasin
                }> Has failed to assassinate you, and you have won **3% (${Math.floor(
                    (3 / 100) * assassinProfile.balance
                )})** of their money, and they lost **5% (${Math.floor(
                    (3 / 100) * assassinProfile.balance
                )})** of their money.`
            );

            try {
                await knex("assasins")
                    .where({ assasin: assa.assasin })
                    .delete();
                await initAssassins();

                await knex<User>("user")
                    .where({ userid: assassinProfile.userid })
                    .first()
                    .update({
                        balance:
                            Number(assassinProfile.balance) -
                            Math.floor((5 / 100) * assassinProfile.balance)
                    });
                await knex<User>("user")
                    .where({ userid: targetProfile.userid })
                    .first()
                    .update({
                        balance:
                            Number(targetProfile.balance) +
                            Math.floor((3 / 100) * assassinProfile.balance)
                    });
                console.log(
                    `Failed assassination by ${assassinProfile.userid} with target ${targetProfile.userid} ended successfully.`
                );
            } catch (e) {
                console.log(e);
            }
        }
    }

    for (const keyword of keywords) {
        if (content.toLowerCase().includes(keyword.keyword)) {
            if (message.channel.type !== "DM") {
                const assassinations = assassins.filter(
                    (value) =>
                        value.serverid === message.guild!.id &&
                        value.target === message.author.id &&
                        Number(value.keywordid) === keyword.id
                );

                for (const assa of assassinations) {
                    if (Number(assa.date) + 86400000 > new Date().getTime()) {
                        // Failed assassinatinos here, delete from database and transfer the money
                        const assassinProfile = (await knex("user")
                            .where({
                                userid: assa.assasin
                            })
                            .first()) as User;
                        const targetProfile = (await knex("user")
                            .where({ userid: assa.target })
                            .first()) as User;

                        if (assassinProfile && targetProfile) {
                            (
                                await message.client.users.fetch(assa.assasin)
                            )?.send(
                                `😎 You successfully assassinated your target (<@${
                                    assa.target
                                }>), and you have won **3% (${Math.floor(
                                    (3 / 100) * targetProfile.balance
                                )})** of your target's money, and your target has lost **5% (${Math.floor(
                                    (5 / 100) * targetProfile.balance
                                )})** of their money.`
                            );
                            (
                                await message.client.users.fetch(assa.target)
                            )?.send(
                                `💀 <@${
                                    assa.assasin
                                }> Has assassinated you, and you have lost **5% (${Math.floor(
                                    (5 / 100) * targetProfile.balance
                                )})** of your money, while your assassin has gained **3% (${Math.floor(
                                    (3 / 100) * targetProfile.balance
                                )})** of it. The keyword was **${
                                    keyword.keyword
                                }**`
                            );

                            try {
                                await knex("assasins")
                                    .where({ assasin: assassinProfile.userid })
                                    .delete();
                                await initAssassins();

                                await knex<User>("user")
                                    .where({ userid: assassinProfile.userid })
                                    .first()
                                    .update({
                                        balance:
                                            Number(assassinProfile.balance) +
                                            Math.floor(
                                                (3 / 100) *
                                                    targetProfile.balance
                                            )
                                    });
                                await knex<User>("user")
                                    .where({ userid: targetProfile.userid })
                                    .first()
                                    .update({
                                        balance:
                                            Number(targetProfile.balance) -
                                            Math.floor(
                                                (5 / 100) *
                                                    targetProfile.balance
                                            )
                                    });
                                console.log(
                                    `Successfull assassination by ${assassinProfile.userid} with target ${targetProfile.userid} ended successfully.`
                                );
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                }
            }
        }
    }

    return;
};

export default new Command().match(checkAssassination()).use(async () => {
    return;
});
