const clicksPerSecondElement = document.getElementById("clicks-per-second")
const autoClickerPriceElement = document.getElementById("auto-clicker-price")
const enableAutoClickerElement = document.getElementById("enable-auto-clicker")

const autoClicker = {
    loopFunction: function () {
        const cost = parseFloat(autoClickerPriceElement.innerText)
        if (cpu.setUsage(cost, 0.5)) {
            if (!game.candleCreated(autoClicker.clicksPerSecond)) {
                enableAutoClickerElement.checked = false
            }
        }else{
            enableAutoClickerElement.checked = false
        }
    },
    clicksPerSecond: 0,
    clicker: null,
    update: function () {
        const newClicksPerSecond = new Number(clicksPerSecondElement.value)
        autoClickerPriceElement.innerText = newClicksPerSecond * constants.AUTO_CLICKER_PRICE_PER_CLICK

        if (enableAutoClickerElement.checked && newClicksPerSecond > 0) {
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

enableAutoClickerElement.addEventListener("change", function (e) {
    autoClicker.update()
})