const messages = [
    `Lol ok.`,
    `Imagine that.`,
    `Ye dude I agree.`,
    `Nah no way.`,
    `Nice, but we need more level up messages.`,
    `A random potato appeared.`,
    `Soo, you really like leveling up huh?`,
    `Hey look you leveled up, AMAZING.`,
    `Don't forget to check the edge cases.`,
    `Don't forget to drink water, stay hydrated.`,
    `PHP is the best!`,
    `Everyone will get bored of those messages eventually so I guess I'll have to add more.`,
    `Wait a second something is happening.`,
    `Toss a coin to this guy, oh valley of coding.`,
    `Imagine saying that.`,
    `2b || !2b, it's funny cuz it's true.`,
    `Or something like that`,
    `Into the deep web we go`,
    `Don't worry this is just a coincidence.`,
    `Procedurally generated messages.`,
    `Do the harlem shake`,
    `Gangnam style.`,
    `And that's a fact.`,
    `This topic...`,
    `I dare you to delete this.`,
    `9999 IQ`,
    `Question mark?`,
    `EZ PEZ LEM SQUEEZE.`,
    `Access denied.`,
    `The legend says that Vyctor661 is still changing his role color.`,
    `I love PIZZA`,
    `https://tenor.com/view/level-up-sparkle-gif-14592228. Sorry to interrupt your conversation but look at this.`,
    `Actually quantum mechanics forbids this.`
]



export default () => { return messages[Math.floor(Math.random() * messages.length)]; }