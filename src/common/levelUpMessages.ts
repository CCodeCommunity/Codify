import knex from "../../db/knex";

let quoteIndexes: Array<number>;

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
    "A R guy",
    "Someone who is dead rn",
    "Rick Astley",
    "||Still your mom||"
];

const randomMessage = async () => {
    const quotes = (await knex("quotes").orderBy("quote")) as Array<{
        quote: string;
        username: string | null;
    }>;

    if (quoteIndexes.length == quotes.length) quoteIndexes = [];

    let index = Math.floor(Math.random() * quotes.length - 1);

    while (quoteIndexes.indexOf(index)) {
        index = Math.floor(Math.random() * quotes.length - 1);
    }
    quoteIndexes.push(index);

    return `*${quotes[index].quote}* ᵃᵈᵈᵉᵈ ᵇʸ __${
        quotes[index].username
            ? quotes[index].username
            : forgottenUsers[
                  Math.floor(Math.random() * forgottenUsers.length - 1)
              ]
    }__`;
};
export default randomMessage;
