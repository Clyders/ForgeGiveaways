"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$isGiveawayEnded',
    description: 'Checks if a giveaway is ended.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The ID of the giveaway.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id]) {
        const all = ctx.client.giveawaysManager?.getAll() ?? [];
        const gw = all.find((g) => String(g.id) === String(id));
        return this.success(gw?.isEnded ?? false);
    }
});
