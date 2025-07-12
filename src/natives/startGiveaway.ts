import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';
import { TextChannel } from 'discord.js';

export default new NativeFunction({
  name: '$startGiveaway',
  description: 'Starts a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'channel ID', description: 'The channel to start the giveaway in.', required: true, rest: false, type: ArgType.Channel },
    { name: 'duration', description: 'Duration in ms.', required: true, rest: false, type: ArgType.Number },
    { name: 'winner count', description: 'Number of winners.', required: true, rest: false, type: ArgType.Number },
    { name: 'prize', description: 'Prize for the giveaway.', required: true, rest: false, type: ArgType.String },
    { name: 'host ID', description: 'User ID of the giveaway host.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [channel, duration, winnerCount, prize, hostMemberID]) {
    if (!channel || !duration || !winnerCount || !prize || !hostMemberID) {
      return this.error(ErrorType.Custom, 'Missing required arguments.');
    }
    const ch = ctx.client.channels.cache.get(channel.id) as TextChannel;
    if (!ch) return this.error(ErrorType.Custom, 'Invalid channel.');
    const gw = await ctx.client.giveawaysManager?.start(ch, { duration, winnerCount, prize, hostMemberID });
    return this.success(gw?.id);
  }
});