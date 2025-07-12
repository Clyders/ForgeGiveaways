import { EventManager } from 'forgescript';

export default {
  name: 'giveawayReroll',
  description: 'Emitted when a giveaway is rerolled.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway rerolled: ${giveaway.id}`);
  },
  intents: ['GuildMessageReactions'],
};
