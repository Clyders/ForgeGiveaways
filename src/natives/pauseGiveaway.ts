import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';

export default new NativeFunction({
  name: '$pauseGiveaway',
  description: 'Pause a giveaway by its message ID.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway to pause.', required: true, rest: false, type: ArgType.String },
    { name: 'options', description: 'Pause options (optional).', required: false, rest: false, type: ArgType.Unknown },
  ],
  async execute(ctx, [id, options]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    try {
      if (typeof manager.pause === 'function') {
        await manager.pause(id, options || {});
        return this.success(true);
      }
      return this.error(ErrorType.Custom, 'Pause not supported.');
    } catch (e) {
      return this.error(ErrorType.Custom, String(e));
    }
  }
}); 