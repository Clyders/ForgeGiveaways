import { NativeFunction } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$getAllGiveaways',
  description: 'Returns all giveaway IDs.',
  unwrap: true,
  async execute(ctx) {
    const all = ctx.client.giveawaysManager?.getAll() ?? [];
    return this.success(all.map((g: Giveaway<DatabaseType.JSON>) => g.id).join(','));
  }
});