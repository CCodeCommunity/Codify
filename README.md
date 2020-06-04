# Codify

A discord bot for the [Code Community Discord Server](https://discord.gg/2JPhJxM).

# About

This bot was created for my comunity on discord because I wanted to provide them a fun bot with a lot of functionalities designed especially for my discord server.

# Add my bot to your discord server

[Just click this link](https://discordapp.com/api/oauth2/authorize?client_id=650637687451156481&permissions=8&scope=bot)

## Commands

-   `cc!help`: Displays a list of commands for the bot.
-   `cc!say [text]`: Makes the bot say something.
-   `cc!meme <subreddit>`: Sends an embed message with a meme from a desired subreddit, you can leave that empty to get a meme from r/programmerHumour
-   `cc!joke`: Sends a joke straight from r/jokes
-   `cc!challenge`: Sends a challenge idea from [here](https://seblague.github.io/ideagenerator/). Huge thanks for the creator. (Temporarily disabled)
-   `cc!anyway [text]`: Another funny command, funnier if you know the meme. This command will send an [image](https://www.google.com/search?q=so+anyway+I+started+blasting&safe=active&rlz=1C1CHBF_enRO859RO859&sxsrf=ACYBGNTs8kLdA8mQSOFItc70BK3hMsQ_TQ:1576777514637&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiR9Zj9ocLmAhXC-yoKHVBjD9IQ_AUoAXoECAoQAw&biw=1920&bih=937) with a custom text set.
-   `cc!profile <user>`: Sends your or someone else's profile data as an embed message.
-   `cc!description <user>`: Set a description for your profile or someone else's description.
-   `cc!balance <user>`: See your or someone else's balance.
-   `cc!daily`: Claim your daily reward. (Some money to put in your balance. And maybe an inspirational quote)
-   `cc!pay [user]`: Give some money to someone else.
-   `cc!gamble [amount]`: Bet some of your money and see if you win something hehe.
-   `cc!top`: Top users by level and xp
-   `cc!topb`: TOp users by balance
-   `cc!poll [Question]|[option 1]|[option 2] ...`: Simple poll command using reactions.
-   `cc!googleit`: Will send an imagine with a quote from code bullet. Nice for telling people to google something.
-   `cc!javaistojs`: This will send an image with a simple explanation for the difference between js and java.
-   `cc!trivia`: This is a trivia comman, answer correctly and you get money.
-   `cc!addquote`: Use this to add new quotes for the levelup messages.
-   `cc!dlum`: If you dont want the level up messages to appear for you just use this command.
-   `cc!webhook`: Use this command to create a webhook in a channel, you need a specific role for it.

### Commands planned for the future

-   `cc!bj`: Blackjack

## How to install

Clone the repo, run `npm install`, set a `.env` file for the following variables: `BOT_TOKEN, COMMUNITY, DATABASE_URL`, make sure that you at least set the `BOT_TOKEN` and `COMMUNITY` variables before continuing, next you can run `npm run dev` to start the bot locally.

If everything is set up correctly you should see your bot online. If you don't know how to make a discord app with a discord bot with a token make sure to follow [this guide](https://www.google.com/search?q=so+anyway+I+started+blasting&safe=active&rlz=1C1CHBF_enRO859RO859&sxsrf=ACYBGNTs8kLdA8mQSOFItc70BK3hMsQ_TQ:1576777514637&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiR9Zj9ocLmAhXC-yoKHVBjD9IQ_AUoAXoECAoQAw&biw=1920&bih=937) following step 2, 3 and 4.

## How to contribute.

It's easy, just fork this repository, add your changes to your fork and then make a pull request.

# Huge thanks to:

-   [Dragomir George](https://github.com/BlueGhostGH) (For helping me create the bot. A lot of early code was written by him.)
-   [Matei Adriel](https://github.com/Mateiadrielrafael) (For reviewing code and providing me ideas.)
-   Other members of my [Discord server](https://discord.gg/2JPhJxM) doing a lot of testing and giving a lot of ideas for the bot.
