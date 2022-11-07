const { Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'check the bot\'s latency',
    developerOnly: false,
    permissions: '',

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
    */

    run: async(interaction, client) => {
        const Reply = await interaction.followUp({ content: `**Client: ${client.ws.ping}ms**` })
        interaction.editReply({ content: `**Client: ${client.ws.ping}ms\nApi: ${Reply.createdTimestamp - interaction.createdTimestamp}ms**` })
    }
}