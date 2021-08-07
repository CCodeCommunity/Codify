import knex from "../../db/knex";

const quoteIndexes: Array<number> = [];
const forgottenUsers = [
    "A forgotten user",
    "Anonymous",
    "Idk I forgot",
    "Anon",
    "Some random dude",
    "Me, maybe",
    "Your mom",
    "A long bearded man",
    "Bill Gates idk",
    "John Petrucci",
    "Thanos",
    "A r guy",
    "Someone who is dead rn",
    "Rick Astley",
    "||Still your mom||"
];

const innitIndexes = (length: number) => {
    for (let i = 0; i < length; i++) quoteIndexes[i] = i;
};

const randomMessage = async () => {
    const quotes = (await knex("quotes").orderBy("quote")) as Array<{
        quote: string;
        username: string | null;
    }>;

    if (quoteIndexes.length == 0) innitIndexes(quotes.length);

    const index = Math.floor(Math.random() * (quoteIndexes.length - 1));
    const quoteNumber = quoteIndexes[index];
    console.log(quoteIndexes.splice(index, 1));
    console.log(quoteIndexes);

    return `*${quotes[quoteNumber].quote}*  **ᵃᵈᵈᵉᵈ ᵇʸ**  _${
        quotes[quoteNumber].username
            ? quotes[quoteNumber].username
            : forgottenUsers[
                  Math.floor(Math.random() * (forgottenUsers.length - 1))
              ]
    }_`;
};
export default randomMessage;
