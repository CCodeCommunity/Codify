import express from "express";

export const prefix = "cc!";
export const port = process.env.PORT || 5000;

export const app = express();