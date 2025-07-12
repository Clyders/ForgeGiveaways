import { GiveawayManager, IGiveawayManagerOptions } from './GiveawayManager';
declare module 'discord.js' {
    interface Client {
        giveawaysManager?: GiveawayManager;
    }
}
export { GiveawayManager, IGiveawayManagerOptions };
