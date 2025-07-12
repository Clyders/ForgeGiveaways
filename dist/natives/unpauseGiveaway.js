"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$unpauseGiveaway',
    description: 'Unpause a giveaway by its message ID.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The message ID of the giveaway to unpause.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        try {
            if (typeof manager.unpause === 'function') {
                await manager.unpause(id);
                return this.success(true);
            }
            return this.error(forgescript_1.ErrorType.Custom, 'Unpause not supported.');
        }
        catch (e) {
            return this.error(forgescript_1.ErrorType.Custom, String(e));
        }
    }
});
