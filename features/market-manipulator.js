const marketManipulator = {
    level: 0,
    upgrade: function () {
        if (game.purchase(constants.UPGRADE_MARKET_PRICE * this.level + 1)) {
            this.level += 1
            document.querySelectorAll(".upgrade-market-price").forEach(e => e.innerText = formatWithCommas(this.nextPrice()))
            market.maxPrice += 0.3
        }
    },
    updateUi: function () {
        document.querySelectorAll(".market-level").forEach(e => e.innerText = formatWithCommas(marketManipulator.level))
    },
    nextPrice: function () {
        return constants.UPGRADE_MARKET_PRICE * (this.level + 1)
    }
}


document.querySelectorAll(".upgrade-market-btn").forEach(e => e.addEventListener("click", function () {
    marketManipulator.upgrade()
}))

document.querySelectorAll(".upgrade-market-price").forEach(e => e.innerText = formatWithCommas(marketManipulator.nextPrice()))