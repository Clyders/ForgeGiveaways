"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'giveawayEntryRemoved',
    description: 'Emitted when a user removes their entry from a giveaway.',
    async listener(giveaway, user) {
        // Add any custom logic here, e.g., logging or notification
        // Example: console.log(`User ${user.id} left giveaway ${giveaway.id}`);
    },
    intents: ['GuildMessageReactions'],
};
