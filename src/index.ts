import { Client } from 'discord.js';
import { ForgeGiveaway, IGiveawayManagerOptions } from './GiveawayManager';

declare module 'discord.js' {
  interface Client {
    giveawaysManager?: ForgeGiveaway;
  }
}

export { ForgeGiveaway, IGiveawayManagerOptions };