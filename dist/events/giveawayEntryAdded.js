"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'giveawayEntryAdded',
    description: 'Emitted when a user adds an entry to a giveaway.',
    async listener(giveaway, user) {
        // Add any custom logic here, e.g., logging or notification
        // Example: console.log(`User ${user.id} entered giveaway ${giveaway.id}`);
    },
    intents: ['GuildMessageReactions'],
};
