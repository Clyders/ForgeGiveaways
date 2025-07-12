import { ArgType, NativeFunction, ErrorType } from 'forgescript';

export default new NativeFunction({
  name: '$removeGiveawayEntry',
  description: 'Remove a user entry from a giveaway by removing their reaction.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: ArgType.String },
    { name: 'user ID', description: 'The user ID to remove from entries.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id, userId]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    if (!userId) return this.error(ErrorType.Custom, 'Missing user ID.');
    
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    
    const all = manager.getAll();
    const gw = all.find(g => String(g.messageID) === String(id));
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
      
      // Remove the user's reaction
      const reaction = '🎉'; // Default reaction
      const messageReaction = message.reactions.cache.get(reaction);
      if (messageReaction) {
        await messageReaction.users.remove(userId);
        return this.success(true);
      }
      
      return this.success(false); // No reaction found
    } catch (e) {
      return this.error(ErrorType.Custom, `Failed to remove entry: ${String(e)}`);
    }
  }
}); 