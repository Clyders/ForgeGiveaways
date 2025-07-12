import { DatabaseType, Giveaways, IDatabaseStructure, IEmbedStringsDefinitions, IGiveawayButtons, IGiveawaysEvents, IGiveaway } from 'discord-giveaways-super';
import { EventManager, ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { Client, TextChannel, User } from 'discord.js';
import { join } from 'path';

// Import package.json for version info
const PACKAGE = require('../package.json');

const resolve = (arg: string, to: string) => arg.replace('structures', to);

export interface IGiveawayManagerOptions {
    events?: (keyof IGiveawaysEvents<DatabaseType.JSON>)[];
    path?: `${string}.json`;
    defineEmbedStrings?: <IsTemplate extends boolean = false>(
        giveaway: IGiveaway,
        giveawayHost: User
    ) => Partial<IEmbedStringsDefinitions<IsTemplate>>;
    buttons?: IGiveawayButtons;
}

export class GiveawayManager extends ForgeExtension {
    name: string = 'ForgeGiveaway';
    description: string = 'Modern Discord giveaway management for ForgeScript';
    version: string = PACKAGE.version;
    targetVersions: string[] = ['1.4.0'];

    client: ForgeClient | null = null;
    options: IGiveawayManagerOptions;
    #path: `${string}.json`;
    self: Giveaways<DatabaseType.JSON, `${string}.json`, IDatabaseStructure> | null = null;
    static Client: ForgeClient | null = null;

    /**
     * Extension options.
     */
    constructor(options: IGiveawayManagerOptions = {}) {
        super();
        this.options = options;
        this.#path = options.path || './giveaways.json' as `${string}.json`;
        this.self = null;
    }

    /**
     * Starts the extension setup.
     * @param client - ForgeClient instance.
     */
    init(client: ForgeClient) {
        this.client = client;
        
        // Initialize the giveaways manager
        this.self = new Giveaways(client, {
            connection: {
                path: this.#path
            },
            database: DatabaseType.JSON,
            // Add embed strings if provided
            ...(this.options.defineEmbedStrings && {
                embedStrings: this.options.defineEmbedStrings
            }),
            // Add buttons if provided
            ...(this.options.buttons && {
                buttons: this.options.buttons
            })
        });

        GiveawayManager.Client = client;
        
        // Attach to client for native functions
        (client as any).giveawaysManager = this;

        // Load events and natives
        EventManager.load('ForgeGiveaway', join(__dirname, 'events'));
        // Natives are loaded automatically by ForgeScript when the extension is initialized

        // Load specific events if provided
        if (this.options.events?.length) {
            client.events.load(
                'ForgeGiveaways',
                this.options.events
            );
        }
    }

    // Basic giveaway operations
    start(
        channel: TextChannel,
        options: { duration: number | string; winnerCount: number; prize: string; hostMemberID: string; [key: string]: any }
    ) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        const { prize, hostMemberID, ...rest } = options;
        return this.self.start({
            guildID: String(channel.guild.id),
            channelID: String(channel.id),
            time: String(options.duration),
            prize,
            winnersCount: options.winnerCount,
            hostMemberID: String(hostMemberID),
            ...rest,
        });
    }

    end(giveawayId: string | number) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        const gw = this.self.get(Number(giveawayId));
        if (gw && gw.isRunning()) return gw.end();
        return null;
    }

    reroll(giveawayId: string | number) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        const gw = this.self.get(Number(giveawayId));
        return gw ? gw.reroll() : null;
    }

    exists(giveawayId: string | number) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        return !!this.self.get(Number(giveawayId));
    }

    getAll() {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        return this.self.getAll();
    }

    edit(messageID: string, options: any) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        const gw = this.self.get(Number(messageID));
        if (gw) {
            // Handle edit based on what properties are being changed
            if (options.prize) gw.prize = options.prize;
            if (options.winnerCount) gw.winnersCount = options.winnerCount;
            return gw;
        }
        return null;
    }

    delete(messageID: string, doNotDeleteMessage = false) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        // Use any to bypass TypeScript checking since the method exists at runtime
        return (this.self as any).delete(messageID, doNotDeleteMessage);
    }

    pause(messageID: string, options: any = {}) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        // Use any to bypass TypeScript checking since the method exists at runtime
        return (this.self as any).pause(messageID, options);
    }

    unpause(messageID: string) {
        if (!this.self) throw new Error('GiveawayManager not initialized');
        
        // Use any to bypass TypeScript checking since the method exists at runtime
        return (this.self as any).unpause(messageID);
    }

    // Get the underlying giveaways instance
    get giveaways() {
        return this.self;
    }
} 