import { EventManager } from 'forgescript';

export default {
  name: 'giveawayDeleted',
  description: 'Emitted when a giveaway is deleted.',
  async listener(giveaway: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway ${giveaway.id} was deleted`);
  },
  intents: ['GuildMessageReactions'],
}; 