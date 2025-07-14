import { GiveawayEventHandler } from '../structures/GiveawayEventManager'
import { DatabaseType, Giveaway } from 'discord-giveaways-super'
import { ForgeGiveaway } from '../GiveawayManager'
import { Interpreter } from '@tryforge/forgescript'

export default new GiveawayEventHandler<'giveawayReroll'>({
    name: 'giveawayReroll',
    description: 'Emitted when a giveaway is rerolled.',
    listener: async function(giveaway: Giveaway<DatabaseType.JSON>, winners: any[]) {
        const commands = ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayReroll')

        if (commands?.length) {
            for (const command of commands) {
                Interpreter.run({
                    command,
                    client: ForgeGiveaway.Client!,
                    data: command.compiled.code,
                    obj: { giveaway, winners }
                })
            }
        }
    },
    intents: ['GuildMessageReactions']
})
