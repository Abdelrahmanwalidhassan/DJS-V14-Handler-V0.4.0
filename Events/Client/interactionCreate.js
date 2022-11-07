const { ChatInputCommandInteraction } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: 'interactionCreate',

    /** 
     * 
     * @param {ChatInputCommandInteraction} interaction
     * 
    */
   execute (interaction, client) {
//    if (!interaction.isChatInputCommand()) return;
    if (interaction.isChatInputCommand()) {

    const command = client.SlashCommands.get(interaction.commandName);
    if (!command) {
        return interaction.reply({ content: `🗂 |**The command has expired.**`, ephemeral: true });
    }

    const admins = client.config.admins;
    if (command.developerOnly && !admins.includes(interaction.member.id)) {
        return interaction.reply({ content: `🛠 | **This is a developer only command, You can't use it**`});
    }

    const checkPermission = (permission) => {
        const Permissions = [
          'CreateInstantInvite',
          'KickMembers',
          'BanMembers',
          'Administrator',
          'ManageChannels',
          'ManageGuild',
          'AddReactions',
          'ViewAuditLog',
          'PrioritySpeaker',
          'Stream',
          'ViewChannel',
          'SendMessages',
          'SendTTSMessages',
          'ManageMessages',
          'EmbedLinks',
          'AttachFiles',
          'ReadMessageHistory',
          'MentionEveryone',
          'UseExternalEmojis',
          'ViewGuildInsights',
          'Connect',
          'Speak',
          'MuteMembers',
          'DeafenMembers',
          'MoveMembers',
          'UseVAD',
          'ChangeNickname',
          'ManageNicknames',
          'ManageRoles',
          'ManageWebhooks',
          'ManageEmojisAndStickers',
        ]
      
        if (!Permissions.includes(permission)) {
          throw new Error(`Unknown permission string "${permission}"`)
        }
      }
      
    if (command) {
      let permission = command.permissions;
      if (permission) {
        checkPermission(command.permissions)
        console.log(permission)
        if (!interaction.member.permissions.has(permission)) {
          return interaction.reply(`🛠 **| You don't have ${permission} permission.**`);
        }            
      }
      interaction.deferReply().then(() => {
        command.run(interaction, client);
      }).catch(() => {});
    }
   }
  if (interaction.isAutocomplete()) {
		const command = client.SlashCommands.get(interaction.commandName);


		try {
      command.run(interaction);
		} catch (error) {
			console.error(error);
		}
	}
   }
}