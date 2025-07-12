import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$getGiveawayInfo',
  description: 'Fetch all details about a giveaway by its message ID.',
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
    const gw = all.find((g: Giveaway<DatabaseType.JSON>) => String(g.messageID) === String(id));
    if (!gw) return this.error(ErrorType.Custom, 'Giveaway not found.');
    // Return all properties as a JSON string
    return this.success(JSON.stringify(gw));
  }
}); 