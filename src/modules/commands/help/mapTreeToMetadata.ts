import { CommandGroup, Command } from "@enitoni/gears-discordjs";
import { CommandMetadata } from "./CommandMetadata";

/**
 * Creates a list of metadata after traversing a command group
 */
export const mapTreeToMetadata = (group: CommandGroup): CommandMetadata[] => {
    return group.commands.flatMap(command => {
        if (command instanceof CommandGroup) {
            if (command.metadata) {
                return [
                    command.metadata as CommandMetadata,
                    ...mapTreeToMetadata(command)
                ];
            }

            return mapTreeToMetadata(command);
        }

        if (command instanceof Command && command.metadata) {
            return [command.metadata as CommandMetadata];
        }

        return [];
    });
};
