import knex from "../../db/knex";

const randomMessage = async () => {
    const randomRowFromQuotes = await knex("quotes")
        .select("quote")
        .orderByRaw("RANDOM()")
        .first();

    console.log(randomRowFromQuotes.quote);

    return randomRowFromQuotes.quote;
};
export default randomMessage;
