import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';

export default new NativeFunction({
  name: '$deleteGiveaway',
  description: 'Delete a giveaway by its message ID. Optionally keep the message.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway to delete.', required: true, rest: false, type: ArgType.String },
    { name: 'doNotDeleteMessage', description: 'Whether to keep the giveaway message (default false).', required: false, rest: false, type: ArgType.Boolean },
  ],
  async execute(ctx, [id, doNotDeleteMessage]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    try {
      if (typeof manager.delete === 'function') {
        await manager.delete(id, Boolean(doNotDeleteMessage));
        return this.success(true);
      }
      return this.error(ErrorType.Custom, 'Delete not supported.');
    } catch (e) {
      return this.error(ErrorType.Custom, String(e));
    }
  }
}); 