import { ArgType, NativeFunction, ErrorType } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export default new NativeFunction({
  name: '$editGiveaway',
  description: 'Edit an ongoing giveaway (prize, duration, winner count).',
  unwrap: true,
  brackets: true,
  args: [
    { name: 'giveaway ID', description: 'The ID of the giveaway to edit.', required: true, rest: false, type: ArgType.Number },
    { name: 'prize', description: 'New prize (optional).', required: false, rest: false, type: ArgType.String },
    { name: 'duration', description: 'New duration in ms (optional).', required: false, rest: false, type: ArgType.Number },
    { name: 'winner count', description: 'New winner count (optional).', required: false, rest: false, type: ArgType.Number },
  ],
  async execute(ctx, [id, prize, duration, winnerCount]) {
    if (!id) return this.error(ErrorType.Custom, 'Missing giveaway ID.');
    const manager = ctx.client.giveawaysManager;
    if (!manager) return this.error(ErrorType.Custom, 'Giveaway manager not found.');
    const all = manager.getAll();
    const gw = all.find((g: Giveaway<DatabaseType.JSON>) => Number(g.id) === Number(id));
    if (!gw) return this.error(ErrorType.Custom, 'Giveaway not found.');
    if (!gw.isRunning()) {
      return this.error(ErrorType.Custom, 'Giveaway is not running.');
    }
    if (prize !== undefined && prize !== null) await gw.edit('prize', String(prize));
    if (duration !== undefined && duration !== null) await gw.edit('duration' as any, Number(duration));
    if (winnerCount !== undefined && winnerCount !== null) await gw.edit('winnerCount' as any, Number(winnerCount));
    return this.success(true);
  }
}); 