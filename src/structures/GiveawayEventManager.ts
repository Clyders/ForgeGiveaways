import { EventManager } from '@tryforge/forgescript';
import { DatabaseType, Giveaway } from 'discord-giveaways-super';

export class GiveawayEventHandler<T extends string> {
    public name: string;
    public description: string;
    public listener: (giveaway: Giveaway<DatabaseType.JSON>, ...args: any[]) => Promise<void>;
    public intents: string[];

    constructor(options: {
        name: string;
        description: string;
        listener: (giveaway: Giveaway<DatabaseType.JSON>, ...args: any[]) => Promise<void>;
        intents: string[];
    }) {
        this.name = options.name;
        this.description = options.description;
        this.listener = options.listener;
        this.intents = options.intents;
    }

    // Method to register the event
    register(client: any) {
        client.events.set(this.name, {
            name: this.name,
            description: this.description,
            listener: this.listener,
            intents: this.intents
        });
    }
} 