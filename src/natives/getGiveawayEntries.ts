import { ArgType, NativeFunction, ErrorType } from 'forgescript';

export default new NativeFunction({
  name: '$getGiveawayEntries',
  description: 'Get all user IDs who have entered a giveaway.',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The message ID of the giveaway.', required: true, rest: false, type: ArgType.String },
  ],
  async execute(ctx, [id]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    
    const all = manager.getAll();
    const gw = all.find(g => String(g.messageID) === String(id));
    if (!gw) return this.error(ErrorType.Custom, 'Giveaway not found.');
    
    try {
      // Get the giveaway message and fetch reaction users
      const message = await ctx.client.channels.cache
        .filter(ch => ch.isTextBased())
        .map(ch => ch as any)
        .find(ch => ch.messages?.cache?.has(id))?.messages?.fetch(id);
      
      if (!message) {
        return this.error(ErrorType.Custom, 'Giveaway message not found.');
      }
      
      const reaction = '🎉'; // Default reaction
      const messageReaction = message.reactions.cache.get(reaction);
      if (messageReaction) {
        const users = await messageReaction.users.fetch();
        const userIds = users.filter((user: any) => !user.bot).map((user: any) => user.id);
        return this.success(userIds.join(','));
      }
      
      return this.success(''); // No reaction found
    } catch (e) {
      return this.error(ErrorType.Custom, `Failed to get entries: ${String(e)}`);
    }
  }
}); 