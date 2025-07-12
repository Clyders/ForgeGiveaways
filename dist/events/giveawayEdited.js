"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'giveawayEdited',
    description: 'Emitted when a giveaway is edited.',
    async listener(giveaway, oldData) {
        // Add any custom logic here, e.g., logging or notification
        // Example: console.log(`Giveaway ${giveaway.id} was edited`);
    },
    intents: ['GuildMessageReactions'],
};
