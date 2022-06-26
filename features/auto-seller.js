const autoSeller = {
    interval: null,
    unlock(){
        if (game.purchase(constants.AUTO_SELLER_UNLOCK_PRICE)){
            document.getElementById("auto-seller-paywall").classList.remove("paywall")
            document.getElementById("buy-auto-seller-btn").remove()
        }
    },
    loopFunction: function () {
        if (game.resources.unsoldCandles > 0) {
            game.sellCandle(game.resources.unsoldCandles, market.currentPrice)
        }
    },
    update: function () {
        if (document.getElementById("enable-auto-seller").checked) {
            autoSeller.interval = window.setInterval(autoSeller.loopFunction, 1000)
        } else {
            window.clearInterval(autoSeller.interval)
        }
    }

}


document.getElementById("enable-auto-seller").addEventListener("change", function (e) {
    autoSeller.update()
})

document.getElementById("buy-auto-seller-btn").addEventListener("click", function (e) {
    autoSeller.unlock()
})

document.getElementById("auto-seller-unlock-price").innerHTML = formatWithCommas(constants.AUTO_SELLER_UNLOCK_PRICE)