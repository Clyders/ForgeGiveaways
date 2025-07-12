import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$drawGiveawayWinners',
  description: 'Manually pick winners for a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: ArgType.String },
    { name: 'winner count', description: 'Number of winners to pick (optional, ignored if not supported).', required: false, rest: false, type: ArgType.Number },
  ],
  async execute(ctx, [id]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    const all = manager.getAll();
    const gw = all.find((g: Giveaway<DatabaseType.JSON>) => String(g.messageID) === String(id));
    if (!gw) return this.error(ErrorType.Custom, 'Giveaway not found.');
    if (typeof gw.reroll === 'function') {
      const winners = await gw.reroll();
      if (Array.isArray(winners)) {
        return this.success(winners.map(u => String(u)).join(','));
      }
      return this.success(String(winners));
    }
    return this.error(ErrorType.Custom, 'Manual draw not supported.');
  }
}); 