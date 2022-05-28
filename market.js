const marketPriceElement = document.getElementById('market-price')

const market = {
    currentPrice: 0,
    updateDisplay: function () {
        market.currentPrice = (randomIntFromInterval(5, 10) / game.candles);
        marketPriceElement.innerText = Math.round(market.currentPrice * 100000) / 100000
    }
}


window.setInterval(market.updateDisplay, 1000)