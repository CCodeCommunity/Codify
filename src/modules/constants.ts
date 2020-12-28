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

export const xpMultiplier = 3;
