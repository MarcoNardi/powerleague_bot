const Discord = require('discord.js');
const dotenv = require('dotenv');
const config = require("./config.json");
const fetch = require('node-fetch');
const User = require("./data/user");
dotenv.config();
const client = new Discord.Client();
prefix = config.prefix;
const baseURL = config.baseURL;
const token = process.env.BRAWLSTARSTOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

async function requestAsync(endpoint) {
    const res = await fetch(baseURL + endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })
    return await res.json();
};

client.on('message', message => {
    if (message.channel.name == "bot-channel") {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        console.log(message.content.toLowerCase());

        if (message.content.toLowerCase() == `${prefix}raider`) {
            message.channel.send("Raider is a god");
            message.channel.send("getting raider data");
            fetch(baseURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                }).then(response => response.json())
                .then(data => {
                    //data.brawlers = "";
                    let msg = JSON.stringify(data);
                    //message.channel.send(msg);
                    var userdata = {
                        playerData: data,
                        discordId: message.author.id
                    }
                    var raider = new User(data, message.author.id);

                    message.channel.send("raider tag is:" + raider.getTag());
                    //message.channel.send("raider userID is:" + raider.getDiscordId());
                }).catch(err => {
                    console.log(err);
                });
            message.channel.send("getting last battle info...");
            fetch(baseURL + "/battlelog", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => response.json()).then(data => {
                list = data.items;
                first = list[0];
                mode = first.event.mode;
                map = first.event.map;
                teams = first.battle.teams;
                team1 = teams[0];
                team2 = teams[1];
                message.channel.send(mode);
                message.channel.send(map);
                for (let i = 0; i < 6; i++) {
                    if (i < 3) {
                        message.channel.send("first team: "+teams[0][i].name+" with "+teams[0][i].brawler.name);
                    }else{
                        message.channel.send("second team: "+teams[1][i-3].name+" with "+teams[1][i-3].brawler.name);
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
        if (message.content.toLowerCase() == `${prefix}visar`) {
            message.channel.send("Visar is the top shelly player in Denmark");
        }
        if (message.content.toLowerCase() == `${prefix}enzo`) {
            message.channel.send("Enzo is the top mr.p player in France");
        }
    }
});

client.login(process.env.TOKEN);