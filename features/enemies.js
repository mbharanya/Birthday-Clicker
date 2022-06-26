const enemies = {
    isActive: false,
    amount: 0,
    interval: null,
    updateSpawnAndKill() {
        const spawnPerSecond = tech.quantumLevel * 10 ** 5 + ((tech.candleSentienceLevel - 1) * 10 ** 6)
        const killPerSecond = tech.candleWeaponsLevel * 10 ** 4 + tech.candleSentienceLevel * 10 ** 6
        console.log("Spawning " + spawnPerSecond + " enemies")
        console.log("Killing " + killPerSecond + " enemies")

        if (enemies.isActive) {
            if (enemies.interval) {
                clearInterval(enemies.interval)
            }

            enemies.interval = window.setInterval(function () {
                enemies.amount -= killPerSecond
                enemies.amount += spawnPerSecond
                if (enemies.amount < 0) {
                    enemies.amount = 0
                }
                document.getElementById("killed-enemies-second").innerText = spellf(killPerSecond)

            }, 1000)
        }
    },
    updateUi() {
        document.getElementById("interdimensional-beings-count").innerText = spellf(enemies.amount)
    },
    activate() {
        this.isActive = true
        this.updateSpawnAndKill()
    }
}

