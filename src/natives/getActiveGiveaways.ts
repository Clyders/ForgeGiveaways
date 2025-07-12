import { NativeFunction, ErrorType } from 'forgescript';

export default new NativeFunction({
  name: '$getActiveGiveaways',
  description: 'List all currently running giveaways (not ended).',
  unwrap: true,
  async execute(ctx) {
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    const all = manager.getAll();
    const active = all.filter(g => g.isEnded === false);
    return this.success(active.map(g => g.messageID).join(','));
  }
}); 