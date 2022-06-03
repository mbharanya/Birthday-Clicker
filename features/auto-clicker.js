const clicksPerSecondElement = document.getElementById("clicks-per-second")
const autoClickerPriceElement = document.getElementById("auto-clicker-price")


const autoClicker = {
    loopFunction: function () {
        const cost = parseFloat(autoClickerPriceElement.innerText)
        if (cpu.setUsage(cost, 0)) {
            if (!game.candleCreated(autoClicker.clicksPerSecond)) {
                // game.resources.money += cost
            }
        }
    },
    clicksPerSecond: 0,
    clicker: null,
    update: function () {
        const newClicksPerSecond = new Number(clicksPerSecondElement.value)
        autoClickerPriceElement.innerText = newClicksPerSecond * constants.AUTO_CLICKER_PRICE_PER_CLICK

        if (document.getElementById("enable-auto-clicker").checked && newClicksPerSecond > 0) {
            if (newClicksPerSecond != autoClicker.clicksPerSecond) {
                window.clearInterval(autoClicker.clicker)
                autoClicker.clicker = window.setInterval(autoClicker.loopFunction, 1000)
                autoClicker.clicksPerSecond = newClicksPerSecond
            }
        } else {
            autoClicker.clicksPerSecond = 0
            window.clearInterval(autoClicker.clicker)
        }
    }
}


clicksPerSecondElement.addEventListener("change", function (e) {
    autoClicker.update()
})

document.getElementById("enable-auto-clicker").addEventListener("change", function (e) {
    autoClicker.update()
})