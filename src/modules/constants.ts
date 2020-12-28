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

export const xpMultiplier = 3;
export const jackpotMultiplier = 10;
export const maxBetLimit = 10000;
export const topXpWinXpGain = 500;
export const topXpWinMoneyGain = 10000;
