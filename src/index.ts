import { Client } from 'discord.js';
import { ForgeGiveaway, IGiveawayManagerOptions } from './structures/GiveawayManager';

declare module 'discord.js' {
  interface Client {
    giveawaysManager?: ForgeGiveaway;
  }
}

export { ForgeGiveaway, IGiveawayManagerOptions };