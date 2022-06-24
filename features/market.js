const marketPriceElement = document.getElementById('market-price')

const market = {
    interval: null,
    currentPrice: 0,
    maxPrice: 0.1,
    updateDisplay: function () {
        market.currentPrice = (getRandomNumber(market.maxPrice - (market.maxPrice / 2), market.maxPrice));
        marketPriceElement.innerText = Math.round(market.currentPrice * 100) / 100
    }
}

market.interval = window.setInterval(market.updateDisplay, 1000)