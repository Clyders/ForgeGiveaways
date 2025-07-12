import { ArgType, NativeFunction, ErrorType } from 'forgescript';

export default new NativeFunction({
  name: '$rerollGiveaway',
  description: 'Rerolls a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The ID of the giveaway to reroll.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const result = await ctx.client.giveawaysManager?.reroll(id);
    if (!result) return this.error(ErrorType.Custom, 'Giveaway not found.');
    return this.success(result);
  }
});