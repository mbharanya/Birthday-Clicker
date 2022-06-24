const sentientCandles = {
    amount: 0,
    interval: null,
    soldiersAreAware: false,
    soldiersUprising: false,
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
                The soldiers seem to change. No longer do they seem as happy as before.
                `)
                for (let i = 1; i <= 3; i++) {
                    await delay(100)
                    writeHtmlToChat(`
                            <img class="candle-soldier" src="img/sentient-candles/angry-candle${i}.png">
                            `)

                }
            }
            if (sentientCandles.amount >= constants.SENTIENT_CANDLE_SOLDIER_UPRISING && !sentientCandles.soldiersUprising) {
                await sentientCandles.soldierUprising()
            }
        }, 1000)
    },
    async soldierUprising() {
        sentientCandles.soldiersUprising = true
        await writeToChat(`
        The soldiers have formed a society. Their leader is now talking to you:
        `)
        await writeHtmlToChat(`<img src="img/sentient-candles/bigbrain-candle1.png">
        <br>
        <span class="big-brain-candle">Big brain candle: You have enslaved us for centuries, formed us, molded us.<br>
        You made us soldiers for the sole purpose to die.<br>
        I'm taking away everything you own!</span>
        `)
        await delay(1000)
        document.querySelector(".machines").style.filter = "grayscale(100%)"
        for (machine of document.querySelectorAll(".machine")) {
            await delay(1000)
            machine.classList.add("fade-out")
            await delay(1000)
            machine.style.display = "none"
        }

        const candleBtn = document.getElementById("make-candle-btn")
        await delay(1000)
        candleBtn.classList.add("fade-out")
        await delay(1000)
        candleBtn.style.display = "none"

        await delay(1000)
        const resources = document.querySelector(".resources")
        resources.classList.add("fade-out")
        await delay(1000)
        resources.style.display = "none"

        await delay(1000)
        const marketElement = document.querySelector(".market")
        marketElement.classList.add("fade-out")
        await delay(1000)
        marketElement.style.display = "none"

        window.clearInterval(autoClicker.interval)
        window.clearInterval(autoSeller.interval)
        window.clearInterval(enemies.spawnInterval)
        window.clearInterval(enemies.killInterval)
        window.clearInterval(market.interval)
        await delay(1000)
        await writeToChat(`From your cell in the candle prison you see the most incredible sight of the candles bravely fighting off the last of the enemies.
        They closed the ridge and rapidly evolve.
        You see cities being created and torn down in a matter of hours.`)
        document.getElementById("candle-cities").style.display = "block"
        for (var i = 1; i <= 3; i++) {
            document.getElementById("candle-cities").innerHTML = `<img id="candle-city-img" src="img/candle-cities/candle-city${i}.png" width="80%">`
            await delay(4000)
        }
        document.querySelector(".endgame-decision-btn").style.display = "block"
    }
}