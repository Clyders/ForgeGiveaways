"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'giveawayDeleted',
    description: 'Emitted when a giveaway is deleted.',
    async listener(giveaway) {
        // Add any custom logic here, e.g., logging or notification
        // Example: console.log(`Giveaway ${giveaway.id} was deleted`);
    },
    intents: ['GuildMessageReactions'],
};
