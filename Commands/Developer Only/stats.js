const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'shows some of bot\'s stats',
      developerOnly: true,

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
    */

    run: async(interaction, client) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        let embed = new EmbedBuilder()
        .setThumbnail(client.user.avatarURL())
        .addFields(
            { name: `\u200B`, value: `**\`#\` Guilds: ${client.guilds.cache.size.toString()}\n\`#\` Users: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toString()}\n\`#\` Uptime: ${seconds}s, ${minutes}m, ${hours}h, ${days}d\n\`#\` Ping: ${client.ws.ping}ms**`, inline: true },
        )
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() || null })
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })

        interaction.followUp({ embeds: [embed] })
    }
}