import { NativeFunction } from 'forgescript';

export default new NativeFunction({
  name: '$getAllGiveaways',
  description: 'Returns all giveaway IDs.',
  unwrap: true,
  async execute(ctx) {
    const all = ctx.client.giveawaysManager?.getAll() ?? [];
    return this.success(all.map(g => g.id).join(','));
  }
});