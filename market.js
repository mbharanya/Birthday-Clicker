const marketPriceElement = document.getElementById('market-price')

const market = {
    currentPrice: 0,
    maxPrice: 10,
    updateDisplay: function () {
        market.currentPrice = (randomIntFromInterval(market.maxPrice - 5, market.maxPrice) / 100);
        marketPriceElement.innerText = Math.round(market.currentPrice * 100000) / 100000
    }
}

window.setInterval(market.updateDisplay, 1000)