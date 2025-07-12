import { ArgType, NativeFunction, ErrorType } from 'forgescript';

export default new NativeFunction({
  name: '$unpauseGiveaway',
  description: 'Unpause a giveaway by its message ID.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway to unpause.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    try {
      if (typeof manager.unpause === 'function') {
        await manager.unpause(id);
        return this.success(true);
      }
      return this.error(ErrorType.Custom, 'Unpause not supported.');
    } catch (e) {
      return this.error(ErrorType.Custom, String(e));
    }
  }
}); 