import { ArgType, NativeFunction } from '@tryforge/forgescript';

export default new NativeFunction({
  name: '$giveawayExists',
  description: 'Checks if a giveaway exists.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The ID of the giveaway.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    return this.success(ctx.client.giveawaysManager?.exists(id) ?? false);
  }
});