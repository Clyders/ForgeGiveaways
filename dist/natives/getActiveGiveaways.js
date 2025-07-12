"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getActiveGiveaways',
    description: 'List all currently running giveaways (not ended).',
    unwrap: true,
    async execute(ctx) {
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        const all = manager.getAll();
        const active = all.filter(g => g.isEnded === false);
        return this.success(active.map(g => g.messageID).join(','));
    }
});
