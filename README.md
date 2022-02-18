# Codify

A discord bot for the Code Community Discord Server.

# About

This bot was created for my comunity on discord because I wanted to provide them a fun bot with a lot of functionalities designed especially for my discord server.

# Add my bot to your discord server

[Just click this link](https://discordapp.com/api/oauth2/authorize?client_id=650637687451156481&permissions=8&scope=bot)

## Commands

Use `cc!help` for a complete list of commands. There are so many that I lost track.

## How to install

Clone the repo, run `npm install`, set a `.env` file for the following variables: `BOT_TOKEN, COMMUNITY, DATABASE_URL`, make sure that you at least set the `BOT_TOKEN` and `COMMUNITY` variables before continuing, next you can run `npm run dev` to start the bot locally.

If everything is set up correctly you should see your bot online. If you don't know how to make a discord app with a discord bot with a token make sure to follow [this guide](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/) following step 2, 3 and 4.

## How to contribute.

It's easy, just fork this repository, add your changes to your fork and then make a pull request.

# Huge thanks to:

Every contributor, and also the members of my discord server that help me with feedback, give me ideas, report bugs, and use the bot everyday.

# Commands 

```md
[1]: Set your description - cc!description/desc/about [text]
- Set your description. Can be seen in cc!profile. Can't be longer than 1000 characters,
[2]: Shows a profile - cc!profile <user>
- Show the profile of a user. The default is the profile of the one who sends the command.,
[3]: Say something - cc!say [text]
- Make the bot say something,
[4]: Daily money - cc!daily/claim/dailyclaim/free
- You get a random amount of coins from 1 to 100, can be used once a day,
[5]: Roll the dice - cc!gamble/dive/slots [amount]
- Gamble a random amount of coins. can be between 1 and 10000,
[6]: Java is to js - cc!javatojs/javaistojs
- Sends an image that explains what java is to javascript,
[7]: Add a keyword for assassinations - cc!addkeyword [keyword] | cc!addassasinkeyword [keyword]
- Sends a request for adding a new keyword for assassinations. Costs 10k, if it gets rejected you get 5k back, and if it doesn't get any response in 24h then you get your 10k back,
[8]: Meme - cc!meme <subreddit>
- Sends a random meme from a subreddit. The default is set to r/ProgrammerHumor. Sometimes it doesn't work because the meme it got was from either an external source or a video/gif,
[9]: Top levels - cc!top/toplevel/topl
- Shows a top with user levels in the server
[10]: Create a webhook - cc!webhook/createwebhook
- Creates a webhook in that channel if the user has the manage webhooks permission or if the user has a role named `webhooks`. Then it sends a dm with the webhook link to the user,
[11]: Toggle the leveling messages in the server. - cc!toggleServerLevelUps | cc!toggleLevels
- Toggle the leveling up in the server, users will still level up, just without the message that shows the level.,
[12]: Create a poll - cc!poll [title]|[option1]|[option2]|...
- Creates a poll,
[13]: Age - cc!age
- Displays the age of the server or of your account.,
[14]: Trivia - cc!trivia
- Sends a trivia question that you can answer, if you are right you can get coins,
[15]: Till Xmas - cc!xmas
- Days left until Christmas,
[16]: Start the assasination of someone - cc!assassinate [serverid] [userid]
- You will be given a word and you will have to make your target say that word, without trying to use any kind of tricks, because there is a catch, if you manage to make that person say that word you were given they will lose 5% of their money, 3% of them will go to you and 2% will be lost, but if you cant manage to make that person say that word you will lose 5% of your money, 3% going to the target and 2% being lost.,
[17]: Disable the level up messages - cc!disablelevelupmessages/dlum
- If you are annoyed by the level up messages you can use this command and if you level up you will no longer get pinged by codify when you level up. You will still level up though,
[18]: Toggle the leveling up quotes in the server. - cc!toggleServerQuotes | cc!toggleQuotes
- Toggle the leveling up quotes in the server, the level up messages will still appear, just without quotes.
[19]: Get a token - cc!gettoken
- Sends a dm with your token for the api. More info into the dm. But the api doesnt work anymore so this command has no use for now.,
[20]: Google it - cc!googleit
- Sends an image from codebullet with just google it,
[21]: Add a quote - cc!addquote [text]
- Sends a request for adding a new quote for level up messages. Costs 10k, if it gets rejected you get 5k back, and if it doesn't get any response in 24h then you get your 10k back,
[22]: Ban a user - cc!ban [user] <reason>
- Bans a user, needs special permissions.,
[23]: Unban a user - cc!unban [userid]
- Unbans a user, needs special permissions.,
[24]: Kick a user - cc!kick [user] <reason>
- Kick a user, needs special permissions.,
[25]: Set the level up channel for your server. - cc!setlevelschannel <channelid>
- It sets the channel for were all of the level up messages will be sent by the bot. Use no argument to reset it.,
[26]: Set the welcome channel for your server. - cc!setwelcomechannel <channelid>
- It sets the channel for were all of the welcome and leave messages will be sent by the bot. Use no arguments to reset it.,
[27]: Set the audit log channel for your server. - cc!setauditchannel <channelid>
- It sets the channel for were all of the log messages will be sent by the bot. Use no arguments to reset it.
[28]: Top balance - cc!topb/topbalance/balancetop
- Shows a top with user balances of the server,
[29]: Make a joke - cc!joke
- Sends a random joke from r/jokes,
[30]: Opt out of the assassinations minigame. - cc!optoutofassassinations/oooa
- If you want to opt out of the assassinations minigame, you can use this command, nobody will be able to assassinate you, at the cost of you not being able to assassinate anyone.,
[31]: Top xp today - cc!topd/topleveltoday/topday
- Shows the top of xp gain today.,
[32]: Copypasta - cc!copypasta
- Sends a copypasta from r/copypasta,
[33]: Pay someone - cc!pay [user] [amount]
- Pay an user a certain amount of coins from your balace,
[34]: Shows the server settings - cc!serversettings
- It will show the server wide settings like the prefix or pins channel, etc.,
[35]: Anyway - cc!anyway/cc!anyways [text]
- Sends an image with Danny Devito that says "So anyway I started [text]",
[36]: Chart - cc!chart [title] | [white side] | [black side]
- Sends a chart comparing the white amount to the black amount. It's an inside server joke, the original chart showed distribution of black vs white people based on iq
[37]: Scream - cc!a
- Makes the bot scream. AAAAAAAAAAAAAAAAAAAAAAAAAAAA,
[38]: Add item to the store - cc!addstoreitem [roleid] [price] [interval in days]
- People with `Manage roles` permission can use this command to add an item to the store, aka a role that can be bought by other users,
[39]: Remove store item - cc!removestoreitem [itemid]
- Remove an item from the store, you need `Manage roles` permission for this,
[40]: Servertime - cc!servertime
- Shows the bot's time, aka the server time.,
[41]: Set the prefix for the commands. - cc!setprefix [prefix]
- It sets the prefix for the commands in the server.,
[42]: Store - cc!store
- Shows the items in the store,
[43]: Top balance globally - cc!topbg/topbalanceglobal/balancetopglobal
- Shows a top with user balances globally.,
[44]: Buy an item - cc!buy [itemid]
- Buy an item from the store of the server. You have to use the id listed in cc!store
[46]: Top levels globally - cc!topg/toplevelglobal/toplg
- Shows a top with user levels globally.,
[47]: Create a pin - cc!pin [messagelink] <description>
- Creates a pin in a special channel created by the server administrator, you need the Manage messages permission to use this command,
[48]: Top xp today globally - cc!topdg/topleveltodayglobal/topdayglobal
- Shows the top of xp gain today globally.,
[49]: Set the pins channel for your server. - cc!setpinschannel <channelid>
- It sets the channel for were the cc!pin messages will go. Use no arguments to reset it.,
[50]: Purchases - cc!purchases
- Shows what purchases you have in the server,
[51]: Unsubscribe - cc!unsubscribe [itemid]
- Unsubscribe from a role that you bought,
[52]: help - cc!help
- Shows this output,
[53]: Reactions - passive
- The bot will react to random messages, it's passive
```

