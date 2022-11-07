function loadSlashCommands(client) {
    const fs = require('fs');
    let CommandsArray = [];
    let DevCommandsArray = [];

    const CommandsDirectory = fs.readdirSync('./Commands');
    for (const CommandFolder of CommandsDirectory) {
        const CommandFiles = fs.readdirSync(`./Commands/${CommandFolder}`)
        .filter(file => file.endsWith('.js'));

        for (const File of CommandFiles) {
            const Commandfile = require(`../Commands/${CommandFolder}/${File}`);

            client.SlashCommands.set(Commandfile.name, Commandfile);

            if (Commandfile.developerOnly) {
                DevCommandsArray.push(Commandfile);
            } else {
                CommandsArray.push(Commandfile);
            }
        }
    }

    client.application.commands.set(CommandsArray);
    client.guilds.cache.get(client.config.DevGuild).commands.set(DevCommandsArray);
    const chalk = require('chalk');
    setTimeout(() => {
      return console.log(chalk.green(`[ COMMANDS ]:`), chalk.yellow(`Loaded succesfully`));  
    }, 1500)
}


module.exports = { loadSlashCommands };