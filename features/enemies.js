const enemies = {
    spawnAmount: 1000,
    amount: 0,
    killPerInterval(amount) {
        window.setInterval(function () {
            enemies.amount -= amount
            if (enemies.amount < 0) {
                enemies.amount = 0
            }
        }, 1000)
    },
    updateUi() {
        document.getElementById("interdimensional-beings-count").innerText = spellf(enemies.amount)
    },
    activate() {
        window.setInterval(function () {
            enemies.amount += enemies.spawnAmount
        }, 1000)
    }
}

