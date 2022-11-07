const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const chalk = require('chalk');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, Channel } = Partials;
const { loadSlashCommands } = require('./Handlers/Commands-Handler');
const { loadEvents } = require('./Handlers/Event-Handler');
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, Channel]
});

client.commands = new Collection();
client.aliases = new Collection();
client.SlashCommands = new Collection();
client.config = require('./config.json');
require('dotenv').config();

client.login(process.env.TOKEN)
.then(async () => {
    loadSlashCommands(client)
    loadEvents(client)
})
.catch(async (err) => { console.log(chalk.red(`[ ERROR ]: Invalid token was provided`)); console.log(err) });