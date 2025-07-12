import { GiveawayEventHandler } from '../structures/GiveawayEventManager'
import { DatabaseType, Giveaway } from 'discord-giveaways-super'
import { ForgeGiveaway } from '../structures/GiveawayManager'
import { Interpreter } from '@tryforge/forgescript'

export default new GiveawayEventHandler<'giveawayEntryRemoved'>({
    name: 'giveawayEntryRemoved',
    description: 'Emitted when a user removes an entry from a giveaway.',
    listener: async function(giveaway: Giveaway<DatabaseType.JSON>, user: any) {
        const commands = ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayEntryRemoved')

        if (commands?.length) {
            for (const command of commands) {
                Interpreter.run({
                    command,
                    client: ForgeGiveaway.Client!,
                    data: command.compiled.code,
                    obj: { giveaway, user }
                })
            }
        }
    },
    intents: ['GuildMessageReactions']
}) 