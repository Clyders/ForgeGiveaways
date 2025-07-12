"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'giveawayPaused',
    description: 'Emitted when a giveaway is paused.',
    async listener(giveaway) {
        // Add any custom logic here, e.g., logging or notification
        // Example: console.log(`Giveaway ${giveaway.id} was paused`);
    },
    intents: ['GuildMessageReactions'],
};
