import { GiveawayEventHandler } from '../structures/GiveawayEventManager'
import { DatabaseType, Giveaway } from 'discord-giveaways-super'
import { ForgeGiveaway } from '../GiveawayManager'
import { Interpreter } from '@tryforge/forgescript'

export default new GiveawayEventHandler<'giveawayEntryAdded'>({
    name: 'giveawayEntryAdded',
    description: 'Emitted when a user adds an entry to a giveaway.',
    listener: async function(giveaway: Giveaway<DatabaseType.JSON>, user: any) {
        const commands = ForgeGiveaway.Client?.giveawaysManager?.commands?.get('giveawayEntryAdded')

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