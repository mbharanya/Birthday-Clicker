const marketPriceElement = document.getElementById('market-price')

const market = {
    currentPrice: 0,
    maxPrice: 0.1,
    updateDisplay: function () {
        market.currentPrice = (getRandomNumber(market.maxPrice - (market.maxPrice / 2), market.maxPrice));
        marketPriceElement.innerText = Math.round(market.currentPrice * 100) / 100
    }
}

window.setInterval(market.updateDisplay, 1000)