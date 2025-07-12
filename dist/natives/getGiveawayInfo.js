"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getGiveawayInfo',
    description: 'Fetch all details about a giveaway by its message ID.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [id]) {
        if (!id)
            return this.error(forgescript_1.ErrorType.Custom, 'Missing giveaway ID.');
        const manager = ctx.client.giveawaysManager;
        if (!manager)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway manager not found.');
        const all = manager.getAll();
        const gw = all.find(g => String(g.messageID) === String(id));
        if (!gw)
            return this.error(forgescript_1.ErrorType.Custom, 'Giveaway not found.');
        // Return all properties as a JSON string
        return this.success(JSON.stringify(gw));
    }
});
