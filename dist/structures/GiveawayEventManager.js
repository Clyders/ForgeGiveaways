"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveawayEventHandler = void 0;
class GiveawayEventHandler {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.listener = options.listener;
        this.intents = options.intents;
    }
    // Method to register the event
    register(client) {
        client.events.set(this.name, {
            name: this.name,
            description: this.description,
            listener: this.listener,
            intents: this.intents
        });
    }
}
exports.GiveawayEventHandler = GiveawayEventHandler;
