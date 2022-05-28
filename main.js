const makeCandleBtn = document.getElementById('make-candle-btn');
const sellCandlesBtn = document.getElementById('sell-candles-btn');

const candleCountElement = document.getElementById('candle-count');

const waxElement = document.getElementById('wax-count')
const moneyElement = document.getElementById('money-count')
const unsoldCandlesElement = document.getElementById('unsold-candles-count')

const autoClickerElement = document.getElementById('auto-clicker')


const constants = {
    AUTO_CLICKER_PRICE_PER_CLICK: 0.1,
    BASE_CANDLES: 99,
    BASE_WAX: 1000,
    BASE_MONEY: 1000,
    WAX_PER_CANDLE: 1,
    waxPrice: {
        bee: 10,
        paraffin: 5,
        ear: 2.3
    }
}

const game = {
    candles: constants.BASE_CANDLES,
    resources: {
        unsoldCandles: constants.BASE_CANDLES,
        wax: constants.BASE_WAX,
        money: constants.BASE_MONEY,
        poshness: 0
    },
    features: {
        hasAutoClicker: false,
        hasWaxCollector: false
    },
    mainLoop:
        window.setInterval(function () {
            game.updateDisplay()
            game.eventCheck()
        }, 10),

    updateDisplay: function () {
        candleCountElement.innerText = formatWithCommas(game.candles)
        waxElement.innerText = formatWithCommas(game.resources.wax)
        moneyElement.innerText = formatWithCommas(game.resources.money, 2)
        unsoldCandlesElement.innerText = formatWithCommas(game.resources.unsoldCandles)
        document.getElementById("poshness-count").innerText = formatWithCommas(game.resources.poshness)
    },
    eventCheck: function () {
        if (!game.features.hasAutoClicker && game.candles === 100) {
            writeToChat("Oof ouchie your finger, have this 🎁")
            game.features.hasAutoClicker = true
            autoClickerElement.style.display = "block"
            document.getElementById("auto-seller").style.display = "block"
        }
        if (game.resources.wax <= 0 && !game.features.hasWaxCollector) {
            writeToChat("You're out of wax, you're a 💩 - autogenerated by Github Copilot")
            game.features.hasWaxCollector = true
            document.getElementById("poshness").style.display = "block"
            document.getElementById('wax-collector').style.display = "block"
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
    purchase: function(amount){
        if (amount <= game.resources.money) {
            game.resources.money -= amount
            return true
        }
        return false
    }
}



makeCandleBtn.addEventListener("click", function (e) {
    game.candleCreated(1)
})

sellCandlesBtn.addEventListener("click", function (e) {
    game.sellCandle(game.resources.unsoldCandles, market.currentPrice)
})



writeToChat("Welcome! To get started, click the button below to make a candle.")