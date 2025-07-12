"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$endGiveaway',
    description: 'Ends a giveaway.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The ID of the giveaway to end.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        const result = await ctx.client.giveawaysManager?.end(id);
        if (!result)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway not found or already ended.');
        return this.success();
    }
});
