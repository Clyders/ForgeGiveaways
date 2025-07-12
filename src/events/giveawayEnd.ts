import { GiveawayEventHandler } from '../structures/GiveawayEventManager'
import { DatabaseType, Giveaway } from 'discord-giveaways-super'
import { ForgeGiveaway } from '../structures/GiveawayManager'
import { Interpreter } from '@tryforge/forgescript'

export default new GiveawayEventHandler<'giveawayEnd'>({
    name: 'giveawayEnd',
    description: 'Emitted when a giveaway ends.',
    listener: async function(giveaway: Giveaway<DatabaseType.JSON>, winners: any[]) {
        const commands = ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayEnd')

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
