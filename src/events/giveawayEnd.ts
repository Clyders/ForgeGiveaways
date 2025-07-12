import { EventManager } from 'forgescript';

export default {
  name: 'giveawayEnd',
  description: 'Emitted when a giveaway ends.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway ended: ${giveaway.id}`);
  },
  intents: ['GuildMessageReactions'],
};
