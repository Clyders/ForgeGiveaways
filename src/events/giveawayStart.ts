import { EventManager } from 'forgescript';

export default {
  name: 'giveawayStart',
  description: 'Emitted when a giveaway starts.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway started: ${giveaway.id}`);
  },
  intents: ['GuildMessageReactions'],
};
