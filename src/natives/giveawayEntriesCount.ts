import { ArgType, NativeFunction } from 'forgescript';

export default new NativeFunction({
  name: '$giveawayEntriesCount',
  description: 'Retrieves the number of entries for a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The ID of the giveaway.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    const all = ctx.client.giveawaysManager?.getAll() ?? [];
    const gw = all.find(g => String(g.id) === String(id));
    return this.success(gw?.entriesCount ?? 0);
  }
});