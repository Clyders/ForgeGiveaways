import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$addGiveawayEntry',
  description: 'Add a user entry to a giveaway by adding the reaction (requires bot permissions).',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: ArgType.String },
    { name: 'user ID', description: 'The user ID to add as an entry.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id, userId]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    if (!userId) return this.error(ErrorType.Custom, 'Missing user ID.');
    
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    
    const all = manager.getAll();
    const gw = all.find((g: Giveaway<DatabaseType.JSON>) => String(g.messageID) === String(id));
    if (!gw) return this.error(ErrorType.Custom, 'Giveaway not found.');
    
    if (!gw.isRunning()) {
      return this.error(ErrorType.Custom, 'Giveaway is not running.');
    }
    
    try {
      // Get the giveaway message using the messageID
      const message = await ctx.client.channels.cache
        .filter(ch => ch.isTextBased())
        .map(ch => ch as any)
        .find(ch => ch.messages?.cache?.has(id))?.messages?.fetch(id);
      
      if (!message) {
        return this.error(ErrorType.Custom, 'Giveaway message not found.');
      }
      
      const reaction = '🎉'; // Default reaction
      await message.react(reaction);
      
      return this.success(true);
    } catch (e) {
      return this.error(ErrorType.Custom, `Failed to add entry: ${String(e)}`);
    }
  }
}); 