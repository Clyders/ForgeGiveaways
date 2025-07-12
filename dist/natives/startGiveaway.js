"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$startGiveaway',
    description: 'Starts a giveaway.',
    unwrap: true,
    brackets: true,
    args: [
        { name: 'channel ID', description: 'The channel to start the giveaway in.', required: true, rest: false, type: forgescript_1.ArgType.Channel },
        { name: 'duration', description: 'Duration in ms.', required: true, rest: false, type: forgescript_1.ArgType.Number },
        { name: 'winner count', description: 'Number of winners.', required: true, rest: false, type: forgescript_1.ArgType.Number },
        { name: 'prize', description: 'Prize for the giveaway.', required: true, rest: false, type: forgescript_1.ArgType.String },
        { name: 'host ID', description: 'User ID of the giveaway host.', required: true, rest: false, type: forgescript_1.ArgType.String },
    ],
    async execute(ctx, [channel, duration, winnerCount, prize, hostMemberID]) {
        if (!channel || !duration || !winnerCount || !prize || !hostMemberID) {
            return this.error(forgescript_1.ErrorType.Custom, 'Missing required arguments.');
        }
        const ch = ctx.client.channels.cache.get(channel.id);
        if (!ch)
            return this.error(forgescript_1.ErrorType.Custom, 'Invalid channel.');
        const gw = await ctx.client.giveawaysManager?.start(ch, { duration, winnerCount, prize, hostMemberID });
        return this.success(gw?.id);
    }
});
