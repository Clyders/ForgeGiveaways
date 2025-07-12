"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getAllGiveaways',
    description: 'Returns all giveaway IDs.',
    unwrap: true,
    async execute(ctx) {
        const all = ctx.client.giveawaysManager?.getAll() ?? [];
        return this.success(all.map((g) => g.id).join(','));
    }
});
