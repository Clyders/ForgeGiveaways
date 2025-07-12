import { DatabaseType, Giveaways, IDatabaseStructure, IEmbedStringsDefinitions, IGiveawayButtons, IGiveawaysEvents, IGiveaway } from 'discord-giveaways-super';
import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { TextChannel, User } from 'discord.js';
export interface IGiveawayManagerOptions {
    events?: (keyof IGiveawaysEvents<DatabaseType.JSON>)[];
    path?: `${string}.json`;
    defineEmbedStrings?: <IsTemplate extends boolean = false>(giveaway: IGiveaway, giveawayHost: User) => Partial<IEmbedStringsDefinitions<IsTemplate>>;
    buttons?: IGiveawayButtons;
}
export declare class ForgeGiveaway extends ForgeExtension {
    #private;
    name: string;
    description: string;
    version: string;
    client: ForgeClient | null;
    options: IGiveawayManagerOptions;
    self: Giveaways<DatabaseType.JSON, `${string}.json`, IDatabaseStructure> | null;
    static Client: ForgeClient | null;
    commands: Map<string, any[]>;
    /**
     * Extension options.
     */
    constructor(options?: IGiveawayManagerOptions);
    /**
     * Starts the extension setup.
     * @param client - ForgeClient instance.
     */
    init(client: ForgeClient): void;
    start(channel: TextChannel, options: {
        duration: number | string;
        winnerCount: number;
        prize: string;
        hostMemberID: string;
        [key: string]: any;
    }): Promise<import("discord-giveaways-super").SafeGiveaway<import("discord-giveaways-super").Giveaway<DatabaseType.JSON>>>;
    end(giveawayId: string | number): Promise<void> | null;
    reroll(giveawayId: string | number): Promise<string[]> | null;
    exists(giveawayId: string | number): boolean;
    getAll(): import("discord-giveaways-super").Giveaway<DatabaseType.JSON>[];
    edit(messageID: string, options: any): import("discord-giveaways-super").UnsafeGiveaway<import("discord-giveaways-super").Giveaway<DatabaseType.JSON>> | null;
    delete(messageID: string, doNotDeleteMessage?: boolean): any;
    pause(messageID: string, options?: any): any;
    unpause(messageID: string): any;
    get giveaways(): Giveaways<DatabaseType.JSON, `${string}.json`, IDatabaseStructure> | null;
}
