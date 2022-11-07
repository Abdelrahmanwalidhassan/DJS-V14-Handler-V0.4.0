const { Client } = require('discord.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const chalk = require('chalk');
require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,

    /** 
     * 
     * @param {Client} client
     * 
    */
   execute (client) {
    console.log(
        chalk.green(`[ TAG ]:`),
        chalk.yellow(`${client.user.tag}`)
    );
    console.log(
        chalk.green(`[ ID ]:`),
        chalk.yellow(`${client.user.id}`)
    );
    console.log(
        chalk.green(`[ GUILDS ]:`),
        chalk.yellow(`${client.guilds.cache.size}`)
    );
    console.log(
        chalk.green(`[ USERS ]:`),
        chalk.yellow(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toString()}`)
    );
    mongoose.connect(process.env.MONGO_URL,{
        keepAlive: true,
    }).then(()=>{
        console.log(chalk.green(`[ DATABASE ]:`), chalk.yellow(`Connected succesfully`));
    }).catch(err => {
      console.log(err.message)
    });

    app.listen(client.config.port, () => {
        console.log(chalk.green(`[ DASHBOARD ]:`), chalk.yellow(`Loaded succesfully`));
    });
   }
}