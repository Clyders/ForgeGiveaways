import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$giveawayWinnersCount',
  description: 'Retrieves the number of winners for a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The ID of the giveaway.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    const all = ctx.client.giveawaysManager?.getAll() ?? [];
    const gw = all.find((g: Giveaway<DatabaseType.JSON>) => String(g.id) === String(id));
    return this.success(gw?.winnersCount ?? 0);
  }
});