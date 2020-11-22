import { CommandMetadata } from "./CommandMetadata";

export const createMetadata = (
    data: Partial<CommandMetadata>
): CommandMetadata => ({
    name: "Unnamed command",
    usage: "Missing usage",
    description: "No description provided.",
    ...data
});
