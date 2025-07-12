"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$giveawayExists',
    description: 'Checks if a giveaway exists.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The ID of the giveaway.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id]) {
        return this.success(ctx.client.giveawaysManager?.exists(id) ?? false);
    }
});
