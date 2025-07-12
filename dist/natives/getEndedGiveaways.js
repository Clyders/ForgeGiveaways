"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getEndedGiveaways',
    description: 'List all ended giveaways.',
    unwrap: true,
    async execute(ctx) {
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        const all = manager.getAll();
        const ended = all.filter((g) => g.isEnded === true);
        return this.success(ended.map((g) => g.messageID).join(','));
    }
});
