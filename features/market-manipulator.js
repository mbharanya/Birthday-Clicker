const marketManipulator = {
    level: 0,
    upgrade: function (amount) {
        for (let i = 0; i < amount; i++) {
            if (game.purchase(this.nextPrice())) {
                this.level += 1
                document.querySelectorAll(".upgrade-market-price").forEach(e => e.innerText = formatWithCommas(this.nextPrice()))
                market.maxPrice += 0.3
            }
        }
    },
    updateUi: function () {
        document.querySelectorAll(".market-level").forEach(e => e.innerText = formatWithCommas(marketManipulator.level))
    },
    nextPrice: function () {
        return constants.UPGRADE_MARKET_PRICE * (this.level + 1)
    }
}


document.querySelectorAll(".upgrade-market-btn").forEach(e => e.addEventListener("click", function (e) {
    const element = e.target.tagName === "SPAN" ? e.target.parentElement : e.target
    marketManipulator.upgrade(parseInt(element.dataset.amount))
}))

document.querySelectorAll(".upgrade-market-price").forEach(e => e.innerText = formatWithCommas(marketManipulator.nextPrice()))