const makeCandleBtn = document.getElementById('make-candle-btn');
const sellCandlesBtn = document.getElementById('sell-candles-btn');

const candleCountElement = document.getElementById('candle-count');
const machinesElement = document.getElementById('machines')

const waxElement = document.getElementById('wax-count')
const moneyElement = document.getElementById('money-count')
const unsoldCandlesElement = document.getElementById('unsold-candles-count')

const autoClickerElement = document.getElementById('auto-clicker')

const game = {
    candles: 99,
    waxPerCandle: 1,
    resources: {
        unsoldCandles: 99,
        wax: 10000,
        money: 0
    },
    features: {
        hasAutoClicker: false
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
    },
    eventCheck: function () {
        if (!game.features.hasAutoClicker && game.candles === 100) {
            writeToChat("Oof ouchie your finger, have this 🎁")
            game.features.hasAutoClicker = true
            autoClickerElement.style.display = "block"
        }
    },
    candleCreated: function (amount) {
        game.candles += amount
        game.resources.wax -= amount * game.waxPerCandle
        game.resources.unsoldCandles += amount
    },
    sellCandle: function(amount, value) {
        if(amount <= game.resources.unsoldCandles){
            game.resources.money += amount * value
            game.resources.unsoldCandles -= amount
        }
    }
}

makeCandleBtn.addEventListener("click", function (e) {
    game.candleCreated(1)
})
sellCandlesBtn.addEventListener("click", function (e) {
    game.sellCandle(game.resources.unsoldCandles, market.currentPrice)
})