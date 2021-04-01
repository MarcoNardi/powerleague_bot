class Player {
    constructor(data) {
        this.data = data
        this.tag = data.tag
        this.name = data.name
        this.trophies = data.trophies
        this.expLevel = data.expLevel
        this.expPoints = data.expPoints
        this.highestTrophies = data.highestTrophies
        this.powerPlayPoints = data.powerPlayPoints
        this.highestPowerPlayPoints = data.highestPowerPlayPoints
        this.trioVictories = data['3vs3Victories']
        this.duoVictories = data.duoVictories
        this.soloVictories = data.soloVictories
        this.isQualifiedFromChampionshipChallenge = data.isQualifiedFromChampionshipChallenge
        this.brawlers = data.brawlers
        this.brawlerCount = data.brawlers.length
    }
    getTag(){
        return this.tag;
    }
}
module.exports = Player;