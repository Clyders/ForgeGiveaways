import { EventManager } from 'forgescript';

export default {
  name: 'giveawayEntryAdded',
  description: 'Emitted when a user adds an entry to a giveaway.',
  async listener(giveaway: any, user: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`User ${user.id} entered giveaway ${giveaway.id}`);
  },
  intents: ['GuildMessageReactions'],
}; 