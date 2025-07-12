import { EventManager } from 'forgescript';

export default {
  name: 'giveawayUnpaused',
  description: 'Emitted when a giveaway is unpaused.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway ${giveaway.id} was unpaused`);
  },
  intents: ['GuildMessageReactions'],
}; 