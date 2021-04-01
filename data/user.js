const Player = require("./player");

class User extends Player{
    constructor(playerData , discordId) {
        super(playerData);
        this.discordId=discordId;
    }
    getDiscordId(){
        return this.discordId;
    }
}
module.exports = User;