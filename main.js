const makeCandleBtn = document.getElementById('make-candle-btn');
const sellCandlesBtn = document.getElementById('sell-candles-btn');

const candleCountElement = document.getElementById('candle-count');

const waxElement = document.getElementById('wax-count')
const moneyElement = document.getElementById('money-count')
const unsoldCandlesElement = document.getElementById('unsold-candles-count')

const autoClickerElement = document.getElementById('auto-clicker')


const constants = {
    AUTO_CLICKER_PRICE_PER_CLICK: 0.1,
    AUTO_CLICKER_UNLOCK_PRICE: 10,
    AUTO_SELLER_UNLOCK_PRICE: 100,
    AUTO_BUY_WAX_UNLOCK_PRICE: 200,
    BASE_CANDLES: 10000,
    BASE_WAX: 1000,
    BASE_GLOBAL_WAX: 1000000000,
    BASE_MONEY: 1000000000,
    BASE_POSHNESS: -10000,
    WAX_PER_CANDLE: 1,
    waxPrice: {
        bee: 10,
        paraffin: 5,
        ear: 2.3
    },
    UPGRADE_CPU_PRICE: 1000,
    UPGRADE_MARKET_PRICE: 5000,
    MARKET_MANIPULATION_THRESHOLD: 10000,
    MARKET_MANIPULATION_POSH_POSHNESS: 10000,
    MARKET_MANIPULATION_DIRTY_POSHNESS: -10000,
    TECH_RESEARCH_COST: 10 * 10 ** 6,
    QUANTUM_UPGRADE_PRICE: 10 ** 6,
    CANDLE_WEAPON_UPGRADE_PRICE: 11 ** 6,
    CANDLE_SENTIENCE_UPGRADE_PRICE: 12 ** 6,
    CANDLE_WEAPON_UPGRADE_CANDLES: 1000,
    SENTIENT_CANDLE_SOLDIER_EVENT: 10**9,
    SENTIENT_CANDLE_SOLDIER_UPRISING: 10**12
}

const game = {
    startTime: new Date(),
    candles: constants.BASE_CANDLES,
    resources: {
        unsoldCandles: constants.BASE_CANDLES,
        globalWax: constants.BASE_GLOBAL_WAX,
        wax: constants.BASE_WAX,
        money: constants.BASE_MONEY,
        poshness: constants.BASE_POSHNESS
    },
    features: {
        hasAutoClicker: false,
        hasWaxMarket: false,
        hasMarketManipulation: false,
        hasDirtyMarketManipulation: false,
        hasCpu: false,
        hasTech: false,
    },
    mainLoop:
        window.setInterval(function () {
            game.updateDisplay()
            game.eventCheck()
        }, 10),

    updateDisplay: function () {
        candleCountElement.innerText = formatWithCommas(game.candles) + ` (${spellf(game.candles)})`
        waxElement.innerText = formatWithCommas(game.resources.wax)
        document.getElementById("global-wax-count").innerText = spellf(game.resources.globalWax)
        moneyElement.innerText = formatWithCommas(game.resources.money, 2) + ` (${spellf(game.resources.money)})`
        unsoldCandlesElement.innerText = formatWithCommas(game.resources.unsoldCandles)
        document.getElementById("poshness-count").innerText = formatWithCommas(game.resources.poshness)
        cpu.updateUi()
        enemies.updateUi()
        sentientCandles.updateUi()
        marketManipulator.updateUi()
    },
    eventCheck: function () {
        if (!game.features.hasAutoClicker && game.candles === 100) {
            writeToChat("Oof ouchie your fingers, why don't you buy something to help you with that?")
            game.features.hasAutoClicker = true
            autoClickerElement.style.display = "block"
            document.getElementById("auto-seller").style.display = "block"
            document.getElementById("cpu").style.display = "block"
        }
        if (game.resources.wax <= 0 && !game.features.hasWaxMarket) {
            writeToChat("You're out of wax, you're a 💩 - message autogenerated by Github Copilot")
            game.features.hasWaxMarket = true
            document.getElementById("poshness").style.display = "block"
            document.getElementById('wax-market').style.display = "block"
        }

        if (game.resources.wax <= 0 && wax.autoBuyer) {
            wax.buy(autoClicker.clicksPerSecond)
        }

        if (game.candles >= constants.MARKET_MANIPULATION_THRESHOLD && game.resources.poshness >= constants.MARKET_MANIPULATION_POSH_POSHNESS && !game.features.hasMarketManipulation) {
            writeToChat("What a posh gentleman🎩\nYou unlocked Posh Market Manipulation")
            game.features.hasMarketManipulation = true
            document.getElementById("posh-market-manipulation").style.display = "block"
        }

        if (game.candles >= constants.MARKET_MANIPULATION_THRESHOLD && game.resources.poshness <= -constants.MARKET_MANIPULATION_DIRTY_POSHNESS && !game.features.hasDirtyMarketManipulation) {
            writeToChat("You are truly disgusting\nYou unlocked Dirty Market Manipulation")
            game.features.hasDirtyMarketManipulation = true
            document.getElementById("dirty-market-manipulation").style.display = "block"
        }

        if (game.resources.globalWax <= 0 && !game.features.hasTech) {
            writeToChat("All of the worlds wax has been used up\nUnlocked Technology Research")
            game.features.hasTech = true
            document.getElementById("tech-research").style.display = "block"
        }
    },
    candleCreated: function (amount) {
        if (game.resources.wax > 0) {
            game.candles += amount
            game.resources.wax -= amount * constants.WAX_PER_CANDLE
            game.resources.unsoldCandles += amount
            return true
        }
        return false
    },
    sellCandle: function (amount, value) {
        if (amount <= game.resources.unsoldCandles) {
            game.resources.money += amount * value
            game.resources.unsoldCandles -= amount
        }
    },
    purchase: function (amount, unsoldCandleAmount = 0) {
        if (amount <= game.resources.money && unsoldCandleAmount <= game.resources.unsoldCandles) {
            game.resources.money -= amount
            game.resources.unsoldCandles -= unsoldCandleAmount
            return true
        }
        return false
    },
}



makeCandleBtn.addEventListener("click", function (e) {
    game.candleCreated(1)
})

sellCandlesBtn.addEventListener("click", function (e) {
    game.sellCandle(game.resources.unsoldCandles, market.currentPrice)
})


// document is loaded
window.addEventListener("load", async function (e) {
    await writeToChat("Hello there...")
    await writeToChat("So you're here expecting a challenge?")
    await writeToChat("Just chill and make some candles!")
})