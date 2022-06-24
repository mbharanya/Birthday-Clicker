const clicksPerSecondElement = document.getElementById("clicks-per-second")
const autoClickerPriceElement = document.getElementById("auto-clicker-price")
const enableAutoClickerElement = document.getElementById("enable-auto-clicker")

const errorElement = document.getElementById("auto-clicker-error")

const autoClicker = {
    loopFunction: function () {
        errorElement.innerText = ""
        const cost = parseFloat(autoClickerPriceElement.innerText)
        if (cpu.setUsage(cost)) {
            if (!game.candleCreated(autoClicker.clicksPerSecond)) {
                errorElement.innerText = "Not enough wax!"
                enableAutoClickerElement.checked = false
            }
        } else {
            errorElement.innerText = "Not enough CPU!"
            enableAutoClickerElement.checked = false
        }
    },
    clicksPerSecond: 0,
    interval: null,
    update: function () {
        const newClicksPerSecond = new Number(clicksPerSecondElement.value)
        autoClickerPriceElement.innerText = newClicksPerSecond * constants.AUTO_CLICKER_PRICE_PER_CLICK

        if (enableAutoClickerElement.checked && newClicksPerSecond > 0) {
            if (newClicksPerSecond != autoClicker.clicksPerSecond) {
                window.clearInterval(autoClicker.interval)
                autoClicker.interval = window.setInterval(autoClicker.loopFunction, 1000)
                autoClicker.clicksPerSecond = newClicksPerSecond
            }
        } else {
            autoClicker.clicksPerSecond = 0
            window.clearInterval(autoClicker.interval)
        }
    }
}


clicksPerSecondElement.addEventListener("change", function (e) {
    autoClicker.update()
})

enableAutoClickerElement.addEventListener("change", function (e) {
    autoClicker.update()
})


document.getElementById("buy-auto-clicker-btn").addEventListener("click", function (e) {
    if (game.purchase(constants.AUTO_CLICKER_UNLOCK_PRICE)){
        document.getElementById("auto-clicker-paywall").classList.remove("paywall")
        document.getElementById("buy-auto-clicker-btn").remove()
    }
})

document.getElementById("auto-clicker-unlock-price").innerHTML = formatWithCommas(constants.AUTO_CLICKER_UNLOCK_PRICE)