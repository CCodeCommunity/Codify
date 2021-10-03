import knex from "../../db/knex";
import { emojis } from "../modules/constants";

const quotesIndexes: Map<string, number[]> = new Map<string, number[]>();
const emojiIndexes: Array<number> = [];
let numberOfTotalQuotes: number;

const initIndexes = async () => {
    const quotes = (await knex("quotes").orderBy("quote")) as Array<{
        quote: string;
        username: string | null;
        serverid: string;
    }>;

    numberOfTotalQuotes = quotes.length;

    const counterMap = new Map<string, { val: number }>();

    for (const quote of quotes) {
        const { serverid } = quote;
        if (counterMap.has(serverid)) {
            counterMap.get(serverid)!.val++;
        } else {
            counterMap.set(serverid, { val: 1 });
        }
    }

    counterMap.forEach((value, key) => {
        const size = value.val;
        const array: number[] = [];

        for (let i = 0; i < size; i++) array[i] = i;
        quotesIndexes.set(key, array);
    });
};

const checkForEmptyMapKey = (serverid: string, map: Map<string, number[]>) => {
    return !(map.has(serverid) && map.get(serverid)?.length);
};

const fixEmptyMapKey = async (serverid: string) => {
    const quotes = (await knex("quotes").orderBy("quote")) as Array<{
        quote: string;
        username: string | null;
        serverid: string;
    }>;

    const counterMap = new Map<string, { val: number }>();

    for (const quote of quotes) {
        const { serverid } = quote;
        if (counterMap.has(serverid)) {
            counterMap.get(serverid)!.val++;
        } else {
            counterMap.set(serverid, { val: 1 });
        }
    }

    const size = counterMap.get(serverid)!.val;
    const array: number[] = [];

    for (let i = 0; i < size; i++) array[i] = i;
    quotesIndexes.set(serverid, array);
};

const innitEmojiIndexes = (length: number) => {
    for (let i = 0; i < length; i++) emojiIndexes[i] = i;
};

const randomMessage = async (serverid: string): Promise<[string, string]> => {
    const quotes = (await knex("quotes").orderBy("quote")) as Array<{
        quote: string;
        username: string | null;
        serverid: string;
    }>;

    if (emojiIndexes.length == 0) innitEmojiIndexes(emojis.length);
    const indexEmoji = Math.floor(Math.random() * (emojiIndexes.length - 1));
    const emojiNumber = emojiIndexes[indexEmoji];

    if (quotes.length !== numberOfTotalQuotes) await initIndexes();
    if (quotesIndexes.size == 0) await initIndexes();

    if (!quotesIndexes.get(serverid))
        return [
            "*Looks like this server has no quotes, use cc!addquote to add a quote.*",
            `${emojis[emojiNumber]}`
        ];

    if (checkForEmptyMapKey(serverid, quotesIndexes))
        await fixEmptyMapKey(serverid);

    const index = Math.floor(
        Math.random() * (quotesIndexes.get(serverid)!.length - 1)
    );
    const quoteNumber = quotesIndexes.get(serverid)![index];

    console.log(quotesIndexes.get(serverid)!.splice(index, 1));
    console.log(quotesIndexes.get(serverid));

    const serverQuotes = quotes.filter(quote => quote.serverid === serverid);

    return [`*${serverQuotes[quoteNumber].quote}*`, `${emojis[emojiNumber]}`];
};
export default randomMessage;
