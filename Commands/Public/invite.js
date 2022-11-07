const { Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'the bot\'s invite link',
    developerOnly: false,
    permissions: '',

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
    */

    run: async(interaction, client) => {
        interaction.followUp({ content: `**Here is an invite link: [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**` })
    }
}