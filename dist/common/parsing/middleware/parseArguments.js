"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../modules/constants");
exports.parseArguments = (context, next) => {
    const { message, state } = context;
    const input = message.content.slice(constants_1.prefix.length).trim();
    const args = input.split(/ +/).slice(1);
    state.args = args;
    return next();
};
