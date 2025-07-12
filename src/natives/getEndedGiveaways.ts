import { NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$getEndedGiveaways',
  description: 'List all ended giveaways.',
  unwrap: true,
  async execute(ctx) {
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    const all = manager.getAll();
    const ended = all.filter((g: Giveaway<DatabaseType.JSON>) => g.isEnded === true);
    return this.success(ended.map((g: Giveaway<DatabaseType.JSON>) => g.messageID).join(','));
  }
}); 