const sentientCandles = {
    amount: 0,
    interval: null,
    soldiersAreAware: false,
    updateUi() {
        document.getElementById("sentient-candles-count").innerText = spellf(sentientCandles.amount)
    },
    update(amount) {
        if (sentientCandles.interval) {
            clearInterval(sentientCandles.interval)
        }
        sentientCandles.interval = window.setInterval(async function () {
            sentientCandles.amount += amount
            enemies.killPerInterval(amount)
            console.log(`Spawned ${amount} sentient candles`)
            if (sentientCandles.amount >= constants.SENTIENT_CANDLE_SOLDIER_EVENT && !sentientCandles.soldiersAreAware) {
                sentientCandles.soldiersAreAware = true
                await writeToChat(`
                The soldiers seem to change. No longer do they seem as happy as before
                `)
                for (let i = 1; i <= 3; i++) {
                    await delay(100)
                    writeHtmlToChat(`
                            <img class="candle-soldier" src="img/sentient-candles/angry-candle${i}.png">
                            `)

                }
            }
        }, 1000)
    }
}