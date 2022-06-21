const enemies = {
    isActive : false,
    spawnAmount: 1000,
    amount: 0,
    spawnInterval: null,
    killInterval: null,
    killPerInterval(amount) {
        if (this.killInterval) {
            clearInterval(this.killInterval)
        }
        this.killInterval = window.setInterval(function () {
            enemies.amount -= amount
            console.log("Killed " + amount + " enemies");
            if (enemies.amount < 0) {
                enemies.amount = 0
            }
            document.getElementById("killed-enemies-second").innerText = spellf(amount)
        }, 1000)
    },
    updateUi() {
        document.getElementById("interdimensional-beings-count").innerText = spellf(enemies.amount)
    },
    activate() {
        this.isActive = true
        enemies.spawnInterval = window.setInterval(function () {
            enemies.amount += enemies.spawnAmount
            console.log("Spawned " + enemies.spawnAmount + " enemies");
        }, 1000)
    },
    update(spawnAmount) {
        if (this.isActive && enemies.spawnInterval && this.spawnAmount !== spawnAmount) {
            this.spawnAmount = spawnAmount
            window.clearInterval(enemies.spawnInterval)
            enemies.spawnInterval = window.setInterval(function () {
                enemies.amount += enemies.spawnAmount
                console.log("Spawned " + enemies.spawnAmount + " enemies");
            }, 1000)
        }
    }
}

