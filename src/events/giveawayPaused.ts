import { EventManager } from 'forgescript';

export default {
  name: 'giveawayPaused',
  description: 'Emitted when a giveaway is paused.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway ${giveaway.id} was paused`);
  },
  intents: ['GuildMessageReactions'],
}; 