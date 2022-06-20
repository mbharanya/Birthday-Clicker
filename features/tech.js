document.getElementById("buy-tech-research").addEventListener("click", function (e) {
    if (game.purchase(constants.TECH_RESEARCH_COST)) {
        document.getElementById("tech-research-paywall").classList.remove("paywall")
        document.getElementById("buy-tech-research").remove()
    }
})

document.getElementById("tech-research-unlock-price").innerHTML = formatWithCommas(constants.TECH_RESEARCH_COST)


const tech = {
    quantumLevel: 0,
    biologyLevel: 0,
    updatePrices: function () {
        document.querySelectorAll(".upgrade-quantum-price").forEach(e => e.innerText = formatWithCommas(this.nextPrice("quantum")))
        document.querySelectorAll(".upgrade-biology-price").forEach(e => e.innerText = formatWithCommas(this.nextPrice("biology")))
    },
    upgrade: function (type) {
        switch (type) {
            case "quantum":
                if (game.purchase(constants.QUANTUM_UPGRADE_PRICE * this.quantumLevel + 1)) {
                    this.quantumLevel += 1
                    document.getElementById("quantum-research-level").innerText = this.quantumLevel
                    this.updatePrices()
                }
                break
            case "biology":
                if (game.purchase(constants.BIOLOGY_UPGRADE_PRICE * this.biologyLevel + 1)) {
                    this.biologyLevel += 1
                    document.getElementById("biology-research-level").innerText = this.biologyLevel
                    this.updatePrices()
                }
                break
        }
        if(this.biologyLevel >= 10){
            writeToChat("You have successfully engineered a pill which increases earwax production in humans")
            game.resources.poshness -= 10000
        }
    },
    nextPrice: function (type) {
        switch (type) {
            case "quantum":
                return constants.QUANTUM_UPGRADE_PRICE * (this.quantumLevel + 1)
            case "biology":
                return constants.BIOLOGY_UPGRADE_PRICE * (this.biologyLevel + 1)
        }
    }
}

document.getElementById("buy-quantum-research").addEventListener("click", function (e) {
    tech.upgrade("quantum")
})

document.getElementById("buy-biology-research").addEventListener("click", function (e) {
    tech.upgrade("biology")
})

tech.updatePrices()