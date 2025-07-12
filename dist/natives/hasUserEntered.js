"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$hasUserEntered',
    description: 'Check if a specific user has entered a giveaway.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: forgescript_1.ArgType.String },
        { name: 'user ID', description: 'The user ID to check.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id, userId]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        if (!userId)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing user ID.');
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        const all = manager.getAll();
        const gw = all.find((g) => String(g.messageID) === String(id));
        if (!gw)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway not found.');
        try {
            // Get the giveaway message and check if user has reacted
            const message = await ctx.client.channels.cache
                .filter(ch => ch.isTextBased())
                .map(ch => ch)
                .find(ch => ch.messages?.cache?.has(id))?.messages?.fetch(id);
            if (!message) {
                return this.error(forgescript_1.ErrorType.Custom, 'Giveaway message not found.');
            }
            const reaction = '🎉'; // Default reaction
            const messageReaction = message.reactions.cache.get(reaction);
            if (messageReaction) {
                const users = await messageReaction.users.fetch();
                const hasEntered = users.has(userId);
                return this.success(hasEntered);
            }
            return this.success(false); // No reaction found
        }
        catch (e) {
            return this.error(forgescript_1.ErrorType.Custom, `Failed to check entry: ${String(e)}`);
        }
    }
});
