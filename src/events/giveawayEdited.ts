import { EventManager } from 'forgescript';

export default {
  name: 'giveawayEdited',
  description: 'Emitted when a giveaway is edited.',
  async listener(giveaway: any, oldData: any) {
    // Add any custom logic here, e.g., logging or notification
    // Example: console.log(`Giveaway ${giveaway.id} was edited`);
  },
  intents: ['GuildMessageReactions'],
}; 