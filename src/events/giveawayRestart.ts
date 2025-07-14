import { GiveawayEventHandler } from '../structures/GiveawayEventManager'
import { DatabaseType, Giveaway } from 'discord-giveaways-super'
import { ForgeGiveaway } from '../GiveawayManager'
import { Interpreter } from '@tryforge/forgescript'

export default new GiveawayEventHandler<'giveawayRestart'>({
    name: 'giveawayRestart',
    description: 'Emitted when a giveaway is restarted.',
    listener: async function(giveaway: Giveaway<DatabaseType.JSON>) {
        const commands = ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayRestart')

        if (commands?.length) {
            for (const command of commands) {
                Interpreter.run({
                    command,
                    client: ForgeGiveaway.Client!,
                    data: command.compiled.code,
                    obj: giveaway
                })
            }
        }
    },
    intents: ['GuildMessageReactions']
})
