"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GiveawayEventManager_1 = require("../structures/GiveawayEventManager");
const GiveawayManager_1 = require("../structures/GiveawayManager");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new GiveawayEventManager_1.GiveawayEventHandler({
    name: 'giveawayPaused',
    description: 'Emitted when a giveaway is paused.',
    listener: async function (giveaway) {
        const commands = GiveawayManager_1.ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayPaused');
        if (commands?.length) {
            for (const command of commands) {
                forgescript_1.Interpreter.run({
                    command,
                    client: GiveawayManager_1.ForgeGiveaway.Client,
                    data: command.compiled.code,
                    obj: giveaway
                });
            }
        }
    },
    intents: ['GuildMessageReactions']
});
