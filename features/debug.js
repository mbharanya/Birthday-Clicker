const debug = {
    unlockWax() {
        game.resources.money = 10000
        game.candles = 100
        game.resources.wax = 0
        game.features.hasWaxMarket = true
        document.getElementById("poshness").style.display = "block"
        document.getElementById('wax-market').style.display = "block"
    },
    unlockTech() {
        cpu.availableCpus = 500;
        game.features.hasMarketManipulation = true
        document.getElementById("posh-market-manipulation").style.display = "block"
        marketManipulator.level = 120
        game.resources.money = 6.6 * 10 ** 6
        game.candles = 10 * 10 ** 6
        game.resources.globalWax = 1
        game.resources.wax = 1
        autoClicker.unlock()
        autoSeller.unlock()
        wax.unlock()
    },
    unlockWeapons() {
        this.unlockTech()
        tech.unlock()
        tech.quantumLevel = 29
        game.resources.money = 10 ** 10
        game.resources.unsoldCandles = 10 ** 10
        tech.updatePrices()
    },
    agasulFight() {
        this.unlockWeapons()
        tech.quantumLevel = 30
        enemies.activate()
        enemies.updateSpawnAndKill()
    },
    endGame() {
        this.agasulFight()
        sentientCandles.amount = constants.SENTIENT_CANDLE_SOLDIER_UPRISING
    }
}