import { DatabaseType, Giveaway } from 'discord-giveaways-super';
export declare class GiveawayEventHandler<T extends string> {
    name: string;
    description: string;
    listener: (giveaway: Giveaway<DatabaseType.JSON>, ...args: any[]) => Promise<void>;
    intents: string[];
    constructor(options: {
        name: string;
        description: string;
        listener: (giveaway: Giveaway<DatabaseType.JSON>, ...args: any[]) => Promise<void>;
        intents: string[];
    });
    register(client: any): void;
}
