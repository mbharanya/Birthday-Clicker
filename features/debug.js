const debug = {
    setup() {
        delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, 0));
        }
        playSound = function () { }
    },
    waxRunsOut() {
        this.setup()
        game.candles = 99
        game.resources.wax = 1
        game.resources.money = 10000
    },
    unlockWax() {
        this.setup()
        game.resources.money = 10000
        game.candles = 100
        game.resources.wax = 0
        game.features.hasWaxMarket = true
        autoClickerElement.style.display = "block"
        document.getElementById("auto-seller").style.display = "block"
        document.getElementById("cpu").style.display = "block"
        document.getElementById("poshness").style.display = "block"
        document.getElementById('wax-market').style.display = "block"
        game.features.hasMarketManipulation = true
        document.getElementById("posh-market-manipulation").style.display = "block"
        autoClicker.unlock()
        autoSeller.unlock()
        wax.unlock()
    },
    unlockTech() {
        this.unlockWax()
        cpu.availableCpus = 500;
        marketManipulator.level = 120
        game.resources.money = 6.6 * 10 ** 6
        game.candles = 10 * 10 ** 6
        game.resources.globalWax = 1
        game.resources.wax = 1
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