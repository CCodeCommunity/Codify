# [1.25.0](https://github.com/Vyctor661/codify/compare/v1.24.1...v1.25.0) (2022-02-18)


### Features

* changed the formula for daily rewards ([8f54dec](https://github.com/Vyctor661/codify/commit/8f54dec6c28c571a2b2342d80b49d665024a4dd1))

## [1.24.1](https://github.com/Vyctor661/codify/compare/v1.24.0...v1.24.1) (2022-02-17)


### Bug Fixes

* another error that I spotted in heroku logs ([7cbcacd](https://github.com/Vyctor661/codify/commit/7cbcacd770a175aa2ee7601e3a2c76917bae62f2))
* broken highlighting fixed ([c043172](https://github.com/Vyctor661/codify/commit/c043172f4c4c22e0b5e0d559aeb30c3faeef20f6))
* hopefully this will fix the thing that caused the crash earlier today ([ff9ab1b](https://github.com/Vyctor661/codify/commit/ff9ab1ba37b804b1eaa4c9a9a329791291af08a7))
* message update creating update loop in audit channel ([e514438](https://github.com/Vyctor661/codify/commit/e5144389ef31a6d1568257603f53c0f470adb076))
* moving a channel around doesnt trigger the channelupdate audit a million times anymore ([e8e12fe](https://github.com/Vyctor661/codify/commit/e8e12fe5aed86be30b862390f24e132859084d42))

# [1.24.0](https://github.com/Vyctor661/codify/compare/v1.23.0...v1.24.0) (2022-02-14)


### Features

* safety for not being able to ban or kick the server owner (just in case) ([f53925e](https://github.com/Vyctor661/codify/commit/f53925e12a48a794551ad979f4ce66bcbe5b3398))

# [1.23.0](https://github.com/Vyctor661/codify/compare/v1.22.0...v1.23.0) (2022-02-14)


### Bug Fixes

* annoying error caused by updating node fetch ([4323a7f](https://github.com/Vyctor661/codify/commit/4323a7fb61efe77e6ef724a484c4035af72df508))
* bad file pathnames ([c866427](https://github.com/Vyctor661/codify/commit/c866427beed75a3cb8cab8b004f4a88081223a41))
* changed the success message because it was saying pins channel instead of welcome channel ([e18c87f](https://github.com/Vyctor661/codify/commit/e18c87fdcb4493ba88a1a3f200f0f358b7f10123))
* help being seen as an invalid command ([26611cd](https://github.com/Vyctor661/codify/commit/26611cd41e282210512b213dbe439ca24791556c))
* help command broken after full update ([cb94d7a](https://github.com/Vyctor661/codify/commit/cb94d7ae438e1f0797fa4cf48e8ad1c8e7eacdff))
* help command crashing the bot ([4452a42](https://github.com/Vyctor661/codify/commit/4452a42cc01dc8751d096ae3423233985bdf1678))
* image manipulation commands now work after update ([8bff5d3](https://github.com/Vyctor661/codify/commit/8bff5d3ae85cafba0c57e15cee5833d8849b2e13))
* invalid command now works again (I blame myself when I refactored the help command long time ago I apparently broke the invalid command thing) ([5d746c8](https://github.com/Vyctor661/codify/commit/5d746c857c5b24dab6fed50de7c2e68b18d12ae0))
* most of the errors after updating discord js, a lot is still broken and needs to be fixed ([7b97b07](https://github.com/Vyctor661/codify/commit/7b97b07168ea7fd1debf14d21e91bb648e5c2f29))
* potential bugs created by synchronicity ([1d7f99e](https://github.com/Vyctor661/codify/commit/1d7f99e13505d46f3d9e1ed40bd649db4e339822))
* tops not working after updating ([2fec7fe](https://github.com/Vyctor661/codify/commit/2fec7fe9ae4dd6d3a54a37ee300ef4205f66625c))
* trivia command crashing the bot ([cf6f046](https://github.com/Vyctor661/codify/commit/cf6f0463fcedc5e798e507ad7ee6efe3c52bfa80))
* updated the set welome channel id command suffix ([d7a0457](https://github.com/Vyctor661/codify/commit/d7a04571d577e30ddcf39f79d60240d1de668dd2))
* updated typescript, fixes a lot of errors ([ab65137](https://github.com/Vyctor661/codify/commit/ab65137e65c38509df855c7bc5c878a472fb76ac))
* webhooks command now works again ([def722f](https://github.com/Vyctor661/codify/commit/def722f2a24f63d56077c7d10735c1a5e31959a2))
* welcome leave messages fix after update ([429318f](https://github.com/Vyctor661/codify/commit/429318f2742bbd79b86175926941f4b75be7ae71))


### Features

* added the logevent to the commands that I think should have it ([2a83a47](https://github.com/Vyctor661/codify/commit/2a83a473fe86e5e9689d95fb9f3b122f42dd0160))
* audit log events ([3f799f4](https://github.com/Vyctor661/codify/commit/3f799f430847eb46487f841830fb7fd4a01855da))
* audit logs no longer ping users, just mentions them ([13921b3](https://github.com/Vyctor661/codify/commit/13921b3397e2cb27ea5e21b85945533588c9a371))
* ban command ([feecfb3](https://github.com/Vyctor661/codify/commit/feecfb31b0e9fe404b640f6588b50ecff93b9ce2))
* better looking embed ([07b5095](https://github.com/Vyctor661/codify/commit/07b509507891548b52b969ec42df1e3f96030ab2))
* ccdaily amount of money now scales with level ([d5f4819](https://github.com/Vyctor661/codify/commit/d5f4819a3b1d99cfbb6539b216af0ec187d2f01c))
* db implementation for only quotes and commands prefix ([1ceb23a](https://github.com/Vyctor661/codify/commit/1ceb23ac86d8ad345fd0badd27f592f575002ada))
* help command shows the proper prefix for the server ([e8ad041](https://github.com/Vyctor661/codify/commit/e8ad0417eb995155d0754a0f528893f5547f1222))
* implemented level up messages channl functionality ([a1449b9](https://github.com/Vyctor661/codify/commit/a1449b9825f09535950c0b41035292a5f7d47d08))
* implemented logging function ([06fcea3](https://github.com/Vyctor661/codify/commit/06fcea3a863a15d18bede8f9cb04f1a413ff0579))
* implemented no level up messages server wide ([025d310](https://github.com/Vyctor661/codify/commit/025d3101878d8b9efc1b11802249daead527abd2))
* kick command ([83e0233](https://github.com/Vyctor661/codify/commit/83e02336129fb9b1842371016e1ebe6864a6a452))
* now no args resets the audit channel ([90944f7](https://github.com/Vyctor661/codify/commit/90944f7c330face06ade58e991efa3a8bb4ba86a))
* now no args resets the pins channel ([d24e4f0](https://github.com/Vyctor661/codify/commit/d24e4f0917c60691134413d19a3c96b123d29e15))
* now no args resets the welcome channel ([347a2a4](https://github.com/Vyctor661/codify/commit/347a2a4f9e5b1bc45d163b380430b95aba0fa483))
* per server prefix ([d16ed78](https://github.com/Vyctor661/codify/commit/d16ed7879ba7e45a0783af9adc2f0a72012559bc))
* server settings command ([e767630](https://github.com/Vyctor661/codify/commit/e767630d43080300ca5586a82cbe37be747c75ab))
* set audit channel id for audit logs ([d21b45f](https://github.com/Vyctor661/codify/commit/d21b45f3b86acd5bfb3379f7bc5c39a86082a540))
* set prefix command for setting the commands prefix in the server ([6036e2f](https://github.com/Vyctor661/codify/commit/6036e2f9e2ce071896070f29c9e54db0f4353c75))
* set welcome channel id for the server ([3ac4e1f](https://github.com/Vyctor661/codify/commit/3ac4e1fad7ff28f608e067335ef89059209c45a8))
* setting levels up channel command ([2e7332c](https://github.com/Vyctor661/codify/commit/2e7332c88c5fdc63f190d70594d1cf289952adea))
* the webhooks command now works if the user has the permission to manage webhooks or if the user has a role named "webhooks" ([a493d22](https://github.com/Vyctor661/codify/commit/a493d223e3078df5e7792fc7c7f496c1ed068134))
* toggle level up messages server wide command ([2a0be59](https://github.com/Vyctor661/codify/commit/2a0be59f14da7d5abe8a909082c7c9393ad33c3d))
* toggle quotes command implementation ([0403d9c](https://github.com/Vyctor661/codify/commit/0403d9c4b7ddbd0c7e5735ea7a14ec7b306b6d98))
* toggleing the quotes now works ([5de2bf0](https://github.com/Vyctor661/codify/commit/5de2bf0ad831f2fcf765dbd4affc3f09e74b2eb2))
* top balance global ([192c6ef](https://github.com/Vyctor661/codify/commit/192c6ef50bcbf38f185b6440c4790fbd19da5f44))
* top level global ([e3d1ab2](https://github.com/Vyctor661/codify/commit/e3d1ab2f83fecbebdfc05792807d6ea8f25ec521))
* tops now use tags instead of displaynames ([170b11b](https://github.com/Vyctor661/codify/commit/170b11b5f5c4084ede9594f7f4eaa7f54606c429))
* total money in the economy and percentage held ([8555f6b](https://github.com/Vyctor661/codify/commit/8555f6be51d0392fd2228a0ef13b9d4519445651))
* unban command ([cc4946c](https://github.com/Vyctor661/codify/commit/cc4946c1ea797fff6e4cada32e450195d979f87c))
* updated no quotes message when the server has no quotes added ([dccb204](https://github.com/Vyctor661/codify/commit/dccb20485e3dced0806a072cd86cf27d1ff9d157))
* user left and joined the server messages ([284b3f0](https://github.com/Vyctor661/codify/commit/284b3f093d5ff19f6edda69fbc7fe480f9b6667d))
* xp today top global command ([e44d75a](https://github.com/Vyctor661/codify/commit/e44d75a6bd6861ff29e0faf2234ab2d55ca9473e))

# [1.22.0](https://github.com/Vyctor661/codify/compare/v1.21.0...v1.22.0) (2021-12-27)


### Features

* new command age ([53d6456](https://github.com/Vyctor661/codify/commit/53d6456a302f1121017735f2ea03c2d1342e4f4e))

# [1.21.0](https://github.com/Vyctor661/codify/compare/v1.20.0...v1.21.0) (2021-12-02)


### Features

* days till christmas left command ([d89e5c6](https://github.com/Vyctor661/codify/commit/d89e5c69f90617967a3577494360407a57ddda3a))

# [1.20.0](https://github.com/Vyctor661/codify/compare/v1.19.2...v1.20.0) (2021-11-03)


### Features

* automatic status changing (at least in theory) ([fcf9889](https://github.com/Vyctor661/codify/commit/fcf988958645a82d4e0d69b94489a523ff20779c))

## [1.19.2](https://github.com/Vyctor661/codify/compare/v1.19.1...v1.19.2) (2021-10-14)


### Bug Fixes

* make sure only non-bot reactions are picked up by trivia ([ecca7f4](https://github.com/Vyctor661/codify/commit/ecca7f4346857043c9da763f5ba91f5b40f01ec3))

## [1.19.1](https://github.com/Vyctor661/codify/compare/v1.19.0...v1.19.1) (2021-10-10)


### Bug Fixes

* fixed a bug in the command cooldowns which made some commands share the same cooldown for some reason, now each command has its own cooldown (and it is kept track of each command cooldown separately) ([bc01064](https://github.com/Vyctor661/codify/commit/bc010647f45c7368cf9b7ba269d86e2337b5aae5))
* reduced most of the command cooldowns to make them less annoying ([e82256d](https://github.com/Vyctor661/codify/commit/e82256d05d34ebdd11486f7c9c702b73ffcc42ed))

# [1.19.0](https://github.com/Vyctor661/codify/compare/v1.18.0...v1.19.0) (2021-10-08)


### Bug Fixes

* removed the ability to add quotes in dms again because it will cause a bug and i didnt realise that ([18ade27](https://github.com/Vyctor661/codify/commit/18ade272001698155d0703cb4031f10e3f06b33c))


### Features

* add command to initialise the assassination of someone ([a7a7250](https://github.com/Vyctor661/codify/commit/a7a725036b2f6019b78800cf54a6ebf3183db54d))
* added a way to opt out of the assassinations minigame ([89b374e](https://github.com/Vyctor661/codify/commit/89b374e9f66ff51c053e2a4bff908c07cd9965de))
* changed codify status and added the assassinations commamands ([8a0eb8e](https://github.com/Vyctor661/codify/commit/8a0eb8e7f1e5b6c072bd400b2705a9ff17736a30))
* command for submitting new keywords for assassinations ([9dd34f9](https://github.com/Vyctor661/codify/commit/9dd34f94593a9956018b5078ed913b168a5b4783))
* passive message listening for assassinations ([dd366c2](https://github.com/Vyctor661/codify/commit/dd366c2b6ee40a563f755174545a9e77270dd1ee))

# [1.18.0](https://github.com/Vyctor661/codify/compare/v1.17.0...v1.18.0) (2021-10-07)


### Bug Fixes

* no overload matches this call ([e3765ba](https://github.com/Vyctor661/codify/commit/e3765ba806cef29fa2c3dbc8e4476b30440434b8))
* now you can add quotes from dms again ([2f54964](https://github.com/Vyctor661/codify/commit/2f549647517b1f1813e97ebda3ac80cdffe94e16))


### Features

* individual command cooldowns ([2eb32ba](https://github.com/Vyctor661/codify/commit/2eb32ba859ead45d05fcf9c210c58004f1672c08))

# [1.17.0](https://github.com/Vyctor661/codify/compare/v1.16.1...v1.17.0) (2021-10-03)


### Features

* emojis now show in the ping message of the level up ([fe8cdd0](https://github.com/Vyctor661/codify/commit/fe8cdd0d124f5eecf24c9fe636b2f58cb188b641))
* per server quotes per server tetris quotes randomisation ([a296842](https://github.com/Vyctor661/codify/commit/a2968429bd6ef2a9a53d2a7ff4791a932b127047))

## [1.16.1](https://github.com/Vyctor661/codify/compare/v1.16.0...v1.16.1) (2021-08-21)


### Bug Fixes

* audit fix ([e951489](https://github.com/Vyctor661/codify/commit/e951489a61401cc4aee992fcebe751ad4dd05f25))
* stuff about the level up messages not working ([b8bc3e1](https://github.com/Vyctor661/codify/commit/b8bc3e1a9c89eaf7f28e37ebfcfb0e8f737ed5b2))

# [1.16.0](https://github.com/Vyctor661/codify/compare/v1.15.0...v1.16.0) (2021-08-20)


### Features

* update for level up messages again ([d5d4d8a](https://github.com/Vyctor661/codify/commit/d5d4d8aefeeee2def39cfb4766d162e5abd6ea4b))

# [1.15.0](https://github.com/Vyctor661/codify/compare/v1.14.0...v1.15.0) (2021-08-07)


### Features

* tetris bag quotes ([3962c44](https://github.com/Vyctor661/codify/commit/3962c44fc9c49e73a122344db62c18b8218c867e))

# [1.14.0](https://github.com/Vyctor661/codify/compare/v1.13.2...v1.14.0) (2021-06-09)


### Bug Fixes

* style being broken for tops ([0d2b10e](https://github.com/Vyctor661/codify/commit/0d2b10ed18bfb4f0b1686d128dde1c7171b4028c))


### Features

* servertime command now also shows the time ([077a94c](https://github.com/Vyctor661/codify/commit/077a94c9d22eedfe9941be3fee3a1417ca492796))

## [1.13.2](https://github.com/Vyctor661/codify/compare/v1.13.1...v1.13.2) (2021-01-20)


### Bug Fixes

* yikes ([97ac5ab](https://github.com/Vyctor661/codify/commit/97ac5abc93fb2b9f82e8ed62ffcd7b9a26c7f6f6))
* yikes ([506ea1d](https://github.com/Vyctor661/codify/commit/506ea1d643ac2ab3efe5d03cf7c412efae25ad15))

## [1.13.1](https://github.com/Vyctor661/codify/compare/v1.13.0...v1.13.1) (2021-01-19)


### Bug Fixes

* codify crashing when using command in dms ([8f863c1](https://github.com/Vyctor661/codify/commit/8f863c139a62eee81968d73d5f840612c895956f))

# [1.13.0](https://github.com/Vyctor661/codify/compare/v1.12.0...v1.13.0) (2021-01-19)


### Features

* better word banning ([5507a51](https://github.com/Vyctor661/codify/commit/5507a513b0e0dec768979a082c883aa7fc90295d))

# [1.12.0](https://github.com/Vyctor661/codify/compare/v1.11.1...v1.12.0) (2021-01-19)


### Features

* banning words from the server ([840aa2a](https://github.com/Vyctor661/codify/commit/840aa2a41b21706d087a8b254f8d85c6577627ad))

## [1.11.1](https://github.com/Vyctor661/codify/compare/v1.11.0...v1.11.1) (2020-12-28)


### Bug Fixes

* well rip my balance ([8134621](https://github.com/Vyctor661/codify/commit/8134621f80b9b41d4cce9754c555de7a852ef168))

# [1.11.0](https://github.com/Vyctor661/codify/compare/v1.10.0...v1.11.0) (2020-12-28)


### Features

* server time command ([9474ef6](https://github.com/Vyctor661/codify/commit/9474ef604575630f9dea92eac764997bcaef4339))

# [1.10.0](https://github.com/Vyctor661/codify/compare/v1.9.0...v1.10.0) (2020-12-28)


### Bug Fixes

* forgot about the multiplier in the message ([73d2a13](https://github.com/Vyctor661/codify/commit/73d2a13ca1c2852f6a153d0607f16923e16f2b49))


### Features

* daily most xp award ([29c49ef](https://github.com/Vyctor661/codify/commit/29c49ef201d29c6b5c20051a3b39fbf3342aa555))
* global daily xp ([0d50890](https://github.com/Vyctor661/codify/commit/0d50890edaab03be847256288c44d0bced06521e))
* top xp today ([d31e143](https://github.com/Vyctor661/codify/commit/d31e143ccd34bb33c4060356903f0157611bb92b))

# [1.9.0](https://github.com/Vyctor661/codify/compare/v1.8.0...v1.9.0) (2020-12-28)


### Features

* holidays jackpot and maxbetlimit increase ([42e23b6](https://github.com/Vyctor661/codify/commit/42e23b6c29b34983146ab191427267906b771f2f))
* qol changes to the top command ([2d0680c](https://github.com/Vyctor661/codify/commit/2d0680c8d0cebfdba3cee979edf0d537d6fcc65c))

# [1.8.0](https://github.com/Vyctor661/codify/compare/v1.7.0...v1.8.0) (2020-12-28)


### Features

* xp multiplier, HOLIDAYS TRIPE XP ([04297dd](https://github.com/Vyctor661/codify/commit/04297ddb8d885ca18159738204f69cfe2220862e))

# [1.7.0](https://github.com/Vyctor661/codify/compare/v1.6.0...v1.7.0) (2020-12-27)


### Features

* cc!profile recognizing usernames without pings ([74885c3](https://github.com/Vyctor661/codify/commit/74885c3a66e405068434b9f00ece6b9d51d1947a))

# [1.6.0](https://github.com/Vyctor661/codify/compare/v1.5.2...v1.6.0) (2020-12-11)


### Features

* new help command design ([9df7c5a](https://github.com/Vyctor661/codify/commit/9df7c5a2d6bec3914dba7fd0724528bcb16630e4))

## [1.5.2](https://github.com/Vyctor661/codify/compare/v1.5.1...v1.5.2) (2020-12-11)


### Bug Fixes

* I have mental issues apparently ([9db17f9](https://github.com/Vyctor661/codify/commit/9db17f9b51163597c14e334b1db7af903a39b613))

## [1.5.1](https://github.com/Vyctor661/codify/compare/v1.5.0...v1.5.1) (2020-12-11)


### Bug Fixes

* apparently some people get discord.com in their copy message links and I get discordapp.com ([fa0b687](https://github.com/Vyctor661/codify/commit/fa0b68759538fe09d07ce6800e1c615cc4d75484))

# [1.5.0](https://github.com/Vyctor661/codify/compare/v1.4.0...v1.5.0) (2020-12-11)


### Bug Fixes

* codify didnt check for manage roles permission when removing store item ([57892a6](https://github.com/Vyctor661/codify/commit/57892a6c53e6327982da387d9f38210da544c0cf))


### Features

* pin and setpinschannel command hehe ([b5183eb](https://github.com/Vyctor661/codify/commit/b5183eb8a93f1737d3eadcad201049dd874e4025))

# [1.4.0](https://github.com/Vyctor661/codify/compare/v1.3.1...v1.4.0) (2020-12-07)


### Bug Fixes

* added metadata to chart command ([511277e](https://github.com/Vyctor661/codify/commit/511277e5df3bee834be4021fe587558fd8972db2))
* fixed bug with floats ([6f156f3](https://github.com/Vyctor661/codify/commit/6f156f36c7d83705ca6f8dfcdbe1de5cbd3861ee))


### Features

* chart command ([fd7e3b4](https://github.com/Vyctor661/codify/commit/fd7e3b4c0d3dbbdd3c202ca8410fe6acdd67953e))

## [1.3.1](https://github.com/Vyctor661/codify/compare/v1.3.0...v1.3.1) (2020-11-22)


### Bug Fixes

* pgw's brain ([7fa9213](https://github.com/Vyctor661/codify/commit/7fa92139ee260655da9f6c1df3cf2cf13640caa5))

# [1.3.0](https://github.com/Vyctor661/codify/compare/v1.2.1...v1.3.0) (2020-11-21)


### Bug Fixes

* qol ([48c1367](https://github.com/Vyctor661/codify/commit/48c1367c72378a3f8a27d01d82b8d223a1991086))


### Features

* now reponding to ^^ as well ([58a681b](https://github.com/Vyctor661/codify/commit/58a681bdda9fca5c1f3363acd57da150f8ce4d0b))

## [1.2.1](https://github.com/Vyctor661/codify/compare/v1.2.0...v1.2.1) (2020-11-21)


### Bug Fixes

* made codify's responses less anoying ([7fa01c8](https://github.com/Vyctor661/codify/commit/7fa01c86c09779dd9a0080ec18c3a94d2d97878a))

# [1.2.0](https://github.com/Vyctor661/codify/compare/v1.1.3...v1.2.0) (2020-11-21)


### Features

* more sentient reponses ([3796d8c](https://github.com/Vyctor661/codify/commit/3796d8c3f5312350207bd4e48e879069abb107a7))
* new copypasta command ([346f3a5](https://github.com/Vyctor661/codify/commit/346f3a55b9646524f08a544062e7d171d8da729a))

## [1.1.3](https://github.com/Vyctor661/codify/compare/v1.1.2...v1.1.3) (2020-11-20)


### Bug Fixes

* friday night bugfix I want to die ([4475576](https://github.com/Vyctor661/codify/commit/4475576657a4424195ee94208b26ee8c3fb596f1))

## [1.1.2](https://github.com/Vyctor661/codify/compare/v1.1.1...v1.1.2) (2020-11-20)


### Bug Fixes

* buying things properly takes the money ([115fedd](https://github.com/Vyctor661/codify/commit/115feddc42254da959dab7f8f60b2e1452c7e962))
* fixed fixing djs stuff unfixing buying things ([38f261d](https://github.com/Vyctor661/codify/commit/38f261d0c1d5ef401cf72233cdb2f577712209c7))
* new djs stuff ([2c870f6](https://github.com/Vyctor661/codify/commit/2c870f624b0361af9ff7f34ece846b888d02c792))
* ok its finally fixed ([51f0828](https://github.com/Vyctor661/codify/commit/51f0828a1f55739f650b0c32bfd2f2aef6634ca6))

## [1.1.1](https://github.com/Vyctor661/codify/compare/v1.1.0...v1.1.1) (2020-11-20)


### Bug Fixes

* friday night master push ([1d13ec2](https://github.com/Vyctor661/codify/commit/1d13ec2c81563e9cd986b71a1f237b9ff26c2fa4))

# [1.1.0](https://github.com/Vyctor661/codify/compare/v1.0.1...v1.1.0) (2020-11-20)


### Bug Fixes

* cc!top bugs and a few other errors ([8491a96](https://github.com/Vyctor661/codify/commit/8491a96c4de5047ccee0a54d21f7878aec17dc39))
* finally fixed problem with not caching ([e592181](https://github.com/Vyctor661/codify/commit/e59218120ad9aba48926f407ebe784147e0897ca))
* fixed review changes ([d4c20ed](https://github.com/Vyctor661/codify/commit/d4c20ed917315d3820161271fd612a695647cee5))
* typo in store migrations ([403c922](https://github.com/Vyctor661/codify/commit/403c9227b3ea1e1a389efcaa76c699622fcaa225))


### Features

* made only users who can manage roles add store items ([2ea8307](https://github.com/Vyctor661/codify/commit/2ea83071abd5ebe9886019968005fc5bf4564c0d))
* store system ([d1bd76f](https://github.com/Vyctor661/codify/commit/d1bd76fe85da2bc0a694166e935d6d17ceb6dc30))
* types and migrations for store ([059662e](https://github.com/Vyctor661/codify/commit/059662e979c7f26ac70978430aec1fe818416faf))
* unsubscribing and purchases ([bcd7fe2](https://github.com/Vyctor661/codify/commit/bcd7fe2e549d0b8484e7fbf3c70756bd5fda684c))

## [1.0.1](https://github.com/Vyctor661/codify/compare/v1.0.0...v1.0.1) (2020-10-03)


### Bug Fixes

* fixing the name of a workflow ([be69480](https://github.com/Vyctor661/codify/commit/be694806ca8eb589db912c767fd2e4b3b34dd06c))

# 1.0.0 (2020-10-01)


### Bug Fixes

* another test ([32a8724](https://github.com/Vyctor661/codify/commit/32a87247f6fb77950d5b530cd394078cf987725a))
* another try to fix it ([89aea90](https://github.com/Vyctor661/codify/commit/89aea90048b591476ecf7633443966aae3da7d3b))
* fixed luke's code ([e21a743](https://github.com/Vyctor661/codify/commit/e21a743389b8751c3f0fa4b5a85e339914b7935f))
* last try to fix codify for now ([c01325b](https://github.com/Vyctor661/codify/commit/c01325b103facd48ea7ddbbc43f3c32b1718abf6))
* semnatic release requiring some dependencies ([5409d6f](https://github.com/Vyctor661/codify/commit/5409d6f2bd3d72c395f8ed86d5dd50368cce62da))
* testing fixes ([bda803e](https://github.com/Vyctor661/codify/commit/bda803e1597c4fdaa99029b9d90d6d48b60d24bb))
* trying a new config changed some paths ([0b1b9cb](https://github.com/Vyctor661/codify/commit/0b1b9cbf066873e824d0a69ef9fd5f0104b68b2e))
* trying again ([6a93584](https://github.com/Vyctor661/codify/commit/6a93584f09b6175aadfe705605c4ef47266225e6))
* trying to fix it again ([ab34447](https://github.com/Vyctor661/codify/commit/ab344478a45047a312505cd1fc33b5c4962d2229))
* trying to fix it again ([8a98dde](https://github.com/Vyctor661/codify/commit/8a98dde2ccb6831e3599e21d4c04e7389374bd8f))
* trying to fix the db error ([d78e7e1](https://github.com/Vyctor661/codify/commit/d78e7e12df1064269765002ba58ab7500b9a1c81))
* typo ([255d4c1](https://github.com/Vyctor661/codify/commit/255d4c162f09c360bd896938d5ceeddb82e2f410))
* xp claim error ([c7efd8d](https://github.com/Vyctor661/codify/commit/c7efd8de020a78a9e4e3ec40a2588ed635bfd85f))


### Features

* added addquote command to add levelup quotes ([d290957](https://github.com/Vyctor661/codify/commit/d29095747bbcffc8d982f8b718955906ed6e9918))
* added new quotes ([cebb5cf](https://github.com/Vyctor661/codify/commit/cebb5cf4e8a8128a80f2b2aee01b985b0bc26eda))
* added semantic release ([ed2c247](https://github.com/Vyctor661/codify/commit/ed2c247f98f1481fcbab677b497a10044a4073ae))
* added trivia command ([c88bc63](https://github.com/Vyctor661/codify/commit/c88bc63b1524f5ab0177e52c1ec849da101f1ff5))
* cc!anyway now also works as cc!anyways ([16cbfe1](https://github.com/Vyctor661/codify/commit/16cbfe108ccdbd544db5f1bef707aafe610a285d))
* now storing the level up messages in the database ([7fd2a8b](https://github.com/Vyctor661/codify/commit/7fd2a8b821be9abc48317a82c7bfe252579cf861))
* now username gets stored along with quote ([0f81d44](https://github.com/Vyctor661/codify/commit/0f81d44a299c85c9d898b6413cb7d06d90d15fa8))
