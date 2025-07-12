import { EventManager } from 'forgescript';

export default {
  name: 'giveawayRestart',
  description: 'Emitted when a giveaway is restarted.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway restarted: ${giveaway.id}`);
  },
  intents: ['GuildMessageReactions'],
};
