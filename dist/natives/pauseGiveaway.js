"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$pauseGiveaway',
    description: 'Pause a giveaway by its message ID.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The message ID of the giveaway to pause.', required: true, rest: false, type: forgescript_1.ArgType.String },
        { name: 'options', description: 'Pause options (optional).', required: false, rest: false, type: forgescript_1.ArgType.Unknown },
    ],
    async execute(ctx, [id, options]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        try {
            if (typeof manager.pause === 'function') {
                await manager.pause(id, options || {});
                return this.success(true);
            }
            return this.error(forgescript_1.ErrorType.Custom, 'Pause not supported.');
        }
        catch (e) {
            return this.error(forgescript_1.ErrorType.Custom, String(e));
        }
    }
});
