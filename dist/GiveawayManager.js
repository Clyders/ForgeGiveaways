"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ForgeGiveaway_path;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeGiveaway = void 0;
const discord_giveaways_super_1 = require("discord-giveaways-super");
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = require("path");
// Import package.json for version info
const PACKAGE = require('../package.json');
const resolve = (arg, to) => arg.replace('structures', to);
class ForgeGiveaway extends forgescript_1.ForgeExtension {
    /**
     * Extension options.
     */
    constructor(options = {}) {
        super();
        this.name = 'ForgeGiveaway';
        this.description = 'Modern Discord giveaway management for ForgeScript';
        this.version = PACKAGE.version;
        this.client = null;
        _ForgeGiveaway_path.set(this, void 0);
        this.self = null;
        this.commands = new Map();
        this.options = options;
        __classPrivateFieldSet(this, _ForgeGiveaway_path, options.path || './giveaways.json', "f");
        this.self = null;
    }
    /**
     * Starts the extension setup.
     * @param client - ForgeClient instance.
     */
    init(client) {
        this.client = client;
        // Initialize the giveaways manager
        this.self = new discord_giveaways_super_1.Giveaways(client, {
            connection: {
                path: __classPrivateFieldGet(this, _ForgeGiveaway_path, "f")
            },
            database: discord_giveaways_super_1.DatabaseType.JSON,
            // Add embed strings if provided
            ...(this.options.defineEmbedStrings && {
                embedStrings: this.options.defineEmbedStrings
            }),
            // Add buttons if provided
            ...(this.options.buttons && {
                buttons: this.options.buttons
            })
        });
        ForgeGiveaway.Client = client;
        // Attach to client for native functions
        client.giveawaysManager = this;
        // Load events and natives
        forgescript_1.EventManager.load('ForgeGiveaway', (0, path_1.join)(__dirname, '..', 'events'));
        this.load(__dirname + `/natives`);
        // Load specific events if provided
        if (this.options.events?.length) {
            client.events.load('ForgeGiveaways', this.options.events);
        }
    }
    // Basic giveaway operations
    start(channel, options) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
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
    end(giveawayId) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        const gw = this.self.get(Number(giveawayId));
        if (gw && gw.isRunning())
            return gw.end();
        return null;
    }
    reroll(giveawayId) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        const gw = this.self.get(Number(giveawayId));
        return gw ? gw.reroll() : null;
    }
    exists(giveawayId) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        return !!this.self.get(Number(giveawayId));
    }
    getAll() {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        return this.self.getAll();
    }
    edit(messageID, options) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        const gw = this.self.get(Number(messageID));
        if (gw) {
            // Handle edit based on what properties are being changed
            if (options.prize)
                gw.prize = options.prize;
            if (options.winnerCount)
                gw.winnersCount = options.winnerCount;
            return gw;
        }
        return null;
    }
    delete(messageID, doNotDeleteMessage = false) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        // Use any to bypass TypeScript checking since the method exists at runtime
        return this.self.delete(messageID, doNotDeleteMessage);
    }
    pause(messageID, options = {}) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        // Use any to bypass TypeScript checking since the method exists at runtime
        return this.self.pause(messageID, options);
    }
    unpause(messageID) {
        if (!this.self)
            throw new Error('GiveawayManager not initialized');
        // Use any to bypass TypeScript checking since the method exists at runtime
        return this.self.unpause(messageID);
    }
    // Get the underlying giveaways instance
    get giveaways() {
        return this.self;
    }
}
exports.ForgeGiveaway = ForgeGiveaway;
_ForgeGiveaway_path = new WeakMap();
ForgeGiveaway.Client = null;
