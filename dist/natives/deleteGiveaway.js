"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteGiveaway',
    description: 'Delete a giveaway by its message ID. Optionally keep the message.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The message ID of the giveaway to delete.', required: true, rest: false, type: forgescript_1.ArgType.String },
        { name: 'doNotDeleteMessage', description: 'Whether to keep the giveaway message (default false).', required: false, rest: false, type: forgescript_1.ArgType.Boolean },
    ],
    async execute(ctx, [id, doNotDeleteMessage]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        try {
            if (typeof manager.delete === 'function') {
                await manager.delete(id, Boolean(doNotDeleteMessage));
                return this.success(true);
            }
            return this.error(forgescript_1.ErrorType.Custom, 'Delete not supported.');
        }
        catch (e) {
            return this.error(forgescript_1.ErrorType.Custom, String(e));
        }
    }
});
