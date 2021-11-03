import express from "express";

export const prefix = process.env.NODE_ENVI === "development" ? "id!" : "cc!";
export const port = process.env.PORT || 5000;

export const app = express();

export const resolveArrayToOne = <T>(arr: T[] | T) => {
    if (Array.isArray(arr)) return arr[0];
    return arr;
};

export const alphabet = "abcdefghijklmnopqrstuvwxyz";
export const emojiLetters = [
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
    "🇬",
    "🇭",
    "🇮",
    "🇯",
    "🇰",
    "🇱",
    "🇲",
    "🇳",
    "🇴",
    "🇵",
    "🇶",
    "🇷",
    "🇸",
    "🇹",
    "🇺",
    "🇻",
    "🇼",
    "🇽",
    "🇾",
    "🇿"
];

export const nth = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

export const xpMultiplier = 1;
export const jackpotMultiplier = 2;
export const maxBetLimit = 10000;
export const topXpWinXpGain = 250;
export const topXpWinMoneyGain = 2500;

export const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "👋",
    "🤚",
    "🖐",
    "✋",
    "🖖",
    "👌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👍",
    "👎",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "👏",
    "🙌",
    "👐",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💅",
    "🤳",
    "💪",
    "🦾",
    "🦵",
    "🦿",
    "🦶",
    "👣",
    "👂",
    "🦻",
    "👃",
    "🧠",
    "🦷",
    "🦴",
    "👀",
    "👅",
    "👄",
    "💋",
    "🩸"
];

export const activity = (): string => {
    switch (new Date().getMonth()) {
        case 0: // Jan
            if (new Date().getDate() === 1) return "🎆 Drinking fireworks.";
            break;
        case 1: // Feb
            break;
        case 2: // Mar
            break;
        case 3: // Apr
            if (new Date().getDate() === 1) return "🤡 Drinking jokes.";
            break;
        case 4: // May
            break;
        case 5: // Jun
            return "🌈 Drinking pride.";
        case 6: // Jul
            return "🏖️ Drinking sand.";
        case 7: // Aug
            break;
        case 8: // Sept
            if (new Date().getDate() === 2) return "🎂 Drinking CC cake.";
            if (new Date().getDate() === 13) return "💻 Drinking code.";
            break;
        case 9: // Oct
            if (new Date().getDate() === 31) return "🩸 Drinking blood.";
            return "🎃 Drinking lava.";
        case 10: // Nov
            return "🥜 Drinking peanut butter.";
        case 11: // Dec
            if (new Date().getDate() === 1) return "🇷🇴 Drinking țuică.";
            if (new Date().getDate() === 25) return "🎁 Drinking gifts.";
            if (new Date().getDate() === 31) return "🍷 Drinking wine.";
            return "❄️ Drinking snow.";
    }
    return "💧 Drinking water.";
};
