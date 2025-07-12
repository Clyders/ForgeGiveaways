# ForgeGiveaways

A modern, lightweight Discord giveaway extension for ForgeScript using `discord-giveaways-super`.

## Features

- **Complete Giveaway Management**: Start, end, edit, delete, pause/unpause giveaways
- **Advanced Operations**: Reroll winners, manual draw, entry management
- **Comprehensive Info**: Get detailed giveaway information, entry counts, winner lists
- **Entry Management**: Add/remove entries, check if users have entered
- **Event System**: Full event handling for all giveaway actions
- **JSON Storage**: Simple file-based storage with `discord-giveaways-super`
- **Modern TypeScript**: Built with latest TypeScript and modern practices

## Installation

```bash
npm install forge-giveaways
```

## Quick Start

```typescript
import { ForgeClient } from 'forgescript';
import { GiveawayManager, IGiveawayManagerOptions } from 'forge-giveaways';

const client = new ForgeClient({
    intents: ['Guilds', 'GuildMessages', 'GuildMessageReactions'],
    extensions: [
        new GiveawayManager({
            path: './giveaways.json', // Optional, defaults to './giveaways.json'
            // Optional: Custom embed strings
            defineEmbedStrings: (giveaway, host) => ({
                start: {
                    title: `🎉 ${giveaway.prize} Giveaway!`,
                    description: `React with 🎉 to enter!\nHosted by: ${host.username}\nEnds: <t:${giveaway.endAt}:R>`
                }
            }),
            // Optional: Custom buttons
            buttons: {
                joinGiveawayButton: {
                    text: 'Join Giveaway',
                    emoji: '🎉',
                    style: 1 // Primary
                }
            }
        })
    ]
});

client.login();
```

## Native Functions

### Basic Operations
- `$startGiveaway[channelId;duration;winnerCount;prize;hostId]` - Start a new giveaway
- `$endGiveaway[giveawayId]` - End a giveaway
- `$rerollGiveaway[giveawayId]` - Reroll winners for a giveaway
- `$deleteGiveaway[giveawayId;keepMessage?]` - Delete a giveaway

### Advanced Operations
- `$editGiveaway[giveawayId;prize?;duration?;winnerCount?]` - Edit giveaway properties
- `$pauseGiveaway[giveawayId;options?]` - Pause a giveaway
- `$unpauseGiveaway[giveawayId]` - Unpause a giveaway
- `$drawGiveawayWinners[giveawayId;winnerCount?]` - Manually draw winners

### Information & Status
- `$getGiveawayInfo[giveawayId]` - Get complete giveaway details (JSON)
- `$getAllGiveaways` - Get all giveaway IDs
- `$getActiveGiveaways` - Get active giveaway IDs
- `$getEndedGiveaways` - Get ended giveaway IDs
- `$giveawayExists[giveawayId]` - Check if giveaway exists
- `$isGiveawayEnded[giveawayId]` - Check if giveaway has ended
- `$isGiveawayFinished[giveawayId]` - Check if giveaway is finished

### Entry Management
- `$addGiveawayEntry[giveawayId;userId]` - Add user entry (bot reaction)
- `$removeGiveawayEntry[giveawayId;userId]` - Remove user entry
- `$getGiveawayEntries[giveawayId]` - Get all user IDs who entered
- `$hasUserEntered[giveawayId;userId]` - Check if user has entered
- `$giveawayEntriesCount[giveawayId]` - Get entry count
- `$giveawayWinnersCount[giveawayId]` - Get winner count
- `$giveawayHostID[giveawayId]` - Get host user ID

## Events

### Core Events
- `giveawayStart` - Emitted when a giveaway starts
- `giveawayEnd` - Emitted when a giveaway ends
- `giveawayReroll` - Emitted when a giveaway is rerolled
- `giveawayRestart` - Emitted when a giveaway is restarted

### Advanced Events
- `giveawayEntryAdded` - Emitted when a user enters a giveaway
- `giveawayEntryRemoved` - Emitted when a user leaves a giveaway
- `giveawayPaused` - Emitted when a giveaway is paused
- `giveawayUnpaused` - Emitted when a giveaway is unpaused
- `giveawayEdited` - Emitted when a giveaway is edited
- `giveawayDeleted` - Emitted when a giveaway is deleted

## Example Usage

### Starting a Giveaway
```typescript
// Start a 24-hour giveaway with 1 winner
$startGiveaway[$channelID;86400000;1;Free Discord Nitro;$authorID]
```

### Managing Entries
```typescript
// Check if user has entered
$if[$hasUserEntered[123456789;987654321]]
    User has entered the giveaway!
$else
    User has not entered the giveaway.
$endif

// Get all entries
$let[entries;$getGiveawayEntries[123456789]]
Entries: $entries
```

### Advanced Operations
```typescript
// Edit a giveaway
$editGiveaway[123456789;New Prize;172800000;2]

// Pause a giveaway
$pauseGiveaway[123456789]

// Get detailed info
$let[info;$getGiveawayInfo[123456789]]
$log[$info]
```

## Configuration

The GiveawayManager accepts the following options:

```typescript
new GiveawayManager(client, {
    storagePath: './giveaways.json' // Path to JSON storage file
});
```

## Requirements

- ForgeScript 1.4.0+
- Discord.js 14+
- Node.js 16+

## License

MIT License - see LICENSE file for details.