import { NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$getActiveGiveaways',
  description: 'List all currently running giveaways (not ended).',
  unwrap: true,
  async execute(ctx) {
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    const all = manager.getAll();
    const active = all.filter((g: Giveaway<DatabaseType.JSON>) => g.isEnded === false);
    return this.success(active.map((g: Giveaway<DatabaseType.JSON>) => g.messageID).join(','));
  }
}); 