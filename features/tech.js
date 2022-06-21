document.getElementById("buy-tech-research").addEventListener("click", function (e) {
    if (game.purchase(constants.TECH_RESEARCH_COST)) {
        document.getElementById("tech-research-paywall").classList.remove("paywall")
        document.getElementById("buy-tech-research").remove()
    }
})

document.getElementById("tech-research-unlock-price").innerHTML = formatWithCommas(constants.TECH_RESEARCH_COST)


const tech = {
    quantumLevel: 26,
    candleWeaponsLevel: 0,
    updatePrices: function () {
        document.querySelectorAll(".upgrade-quantum-price").forEach(e => e.innerText = formatWithCommas(this.nextPrice("quantum")))
        document.querySelectorAll(".upgrade-candle-weapon-research-price").forEach(e =>
            e.innerText = `${formatWithCommas(this.nextPrice("candleWeapons"))}$ and ${formatWithCommas(this.nextPrice("candleWeaponsCandles"))} unsold candles`
        )
    },
    upgrade: function (type) {
        switch (type) {
            case "quantum":
                if (game.purchase(this.nextPrice("quantum"))) {
                    this.quantumLevel += 1
                    document.getElementById("quantum-research-level").innerText = this.quantumLevel
                    this.updatePrices()
                    this.eventCheck(type)
                }
                break
            case "candleWeapons":
                if (game.purchase(this.nextPrice("candleWeapons"), constants.CANDLE_WEAPON_UPGRADE_CANDLES * this.candleWeaponsLevel + 1)) {
                    this.candleWeaponsLevel += 1
                    document.getElementById("candleWeapons-research-level").innerText = this.candleWeaponsLevel
                    this.updatePrices()
                    this.eventCheck(type)
                }
                break
        }
    },
    nextPrice: function (type) {
        switch (type) {
            case "quantum":
                return constants.QUANTUM_UPGRADE_PRICE * (this.quantumLevel + 1)
            case "candleWeapons":
                return constants.CANDLE_WEAPON_UPGRADE_PRICE * (this.candleWeaponsLevel + 1)
            case "candleWeaponsCandles":
                return constants.CANDLE_WEAPON_UPGRADE_CANDLES * (this.candleWeaponsLevel + 1)
        }
    },
    eventCheck: async function (type) {
        switch (type) {
            case "quantum":
                if (this.quantumLevel == 1) {
                    await writeToChat(`
                    You found something strange...
                    There seems to be some way of opening a rift to another dimension
                    Your scientists gaze in awe, as a large rip in the spacetime starts to open................`)
                    await delay(1000)
                    await writeToChat(`The other side seems to be some kind of warehouse, filled with with a strange substance.
                    A brave scientist uses a long grabbing tool to carefully lift a piece out of the rift
                    He feels a large amount of force pulling against him, but he manages to pull the object through.
                    It turns out to be high quality wax!`)
                    await writeToChat("Global wax supply increased!")
                }
                game.resources.globalWax += (10 ** 10) * this.quantumLevel

                if (this.quantumLevel == 10) {
                    await writeToChat(`
                    As your scientists keep continuing to extract the substance, they notice that the quality of the wax is deteriorating.
                    `)
                }
                if (this.quantumLevel == 15) {
                    await writeToChat(`
                    Strange sounds start to emerge from the depths of the rift.
                    A coldness starts to fill the air and strange rumbling noises can be heard
                    `)
                }
                if (this.quantumLevel == 17) {
                    await writeToChat(`
                    Strange sounds start to emerge from the depths of the rift.
                    A coldness starts to fill the air and strange rumbling noises can be heard
                    `)
                }
                if (this.quantumLevel == 30) {
                    writeHtmlToChat(`<img src="img/interdimensional1.png" style="width: 100%;">`)
                    await delay(1000)
                    writeHtmlToChat(`<p class="creepy">Agasul: Why have you disturbed my peace, mortals?</p>`)
                    writeToChat(`Oh fuck, if only there was some way to fight this monster?!
                    Wait didn't we make ${spellf(game.candles)} candles?
                    Maybe we can use them to fight them off?`)
                    document.getElementById("buy-candle-weapons-research").style.display = "block"
                    document.getElementById("interdimensional-beings").style.display = "block"
                    enemies.activate()
                }
                enemies.update(this.quantumLevel * 10)

                break
            case "candleWeapons":
                document.getElementById("candle-weapons").innerHTML += `<img class="weapon-item" src="img/candle-weapon/level${this.candleWeaponsLevel}.png" onerror="this.remove()">`
                enemies.killPerInterval(this.candleWeaponsLevel * 10)
                if (this.candleWeaponsLevel == 1) {
                    await writeToChat(`
                    You successfully created a candle weapon! I don't think it's enough yet though.
                    `)
                }
         
                if (this.candleWeaponsLevel == 5) {
                    await writeToChat(`
                    Yes yes much better!
                    `)
                }
                if (this.candleWeaponsLevel == 30) {
                    await writeToChat(`This still does not seem enough, but we're still just using guns. Maybe there is a way to autonomously control the weapons?
                    Or better yet, let the weapons themselves fight.`)
                }
                break
        }
    }
}

document.getElementById("buy-quantum-research").addEventListener("click", function (e) {
    tech.upgrade("quantum")
})

document.getElementById("buy-candle-weapons-research").addEventListener("click", function (e) {
    tech.upgrade("candleWeapons")
})

tech.updatePrices()