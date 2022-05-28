const autoSeller = {
    interval: null,
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