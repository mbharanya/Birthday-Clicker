
document.getElementById("bee-wax-price").innerText = constants.waxPrice.bee
document.getElementById("paraffin-wax-price").innerText = constants.waxPrice.paraffin
document.getElementById("ear-wax-price").innerText = constants.waxPrice.ear



document.getElementById("buy-bee-wax").addEventListener("click", function (e) {
    wax.buy(100, "bee")
})

document.getElementById("buy-paraffin-wax").addEventListener("click", function (e) {
    wax.buy(100, "paraffin")

})
document.getElementById("buy-ear-wax").addEventListener("click", function (e) {
    wax.buy(100, "ear")
})


document.getElementById("enable-auto-wax-buyer").addEventListener("change", function (e) {
    wax.autoBuyer = this.checked
    wax.waxAutoBuyType = document.querySelector('input[name="auto-buy-wax"]:checked').value
})


const wax = {
    autoBuyer: false,
    waxAutoBuyType: "bee",
    unlock() {
        if (game.purchase(constants.AUTO_BUY_WAX_UNLOCK_PRICE)) {
            document.getElementById("wax-auto-buy-paywall").classList.remove("paywall")
            document.getElementById("buy-auto-wax-btn").remove()
        }
    },
    buy: (amount, type) => {
        if (!type && wax.autoBuyer) {
            type = document.querySelector('input[name="auto-buy-wax"]:checked').value
        }
        if (game.resources.globalWax - amount >= 0) {
            switch (type) {
                case "bee":
                    if (game.purchase(constants.waxPrice.bee)) {
                        game.resources.poshness += amount
                        game.resources.wax += amount
                        game.resources.globalWax -= amount
                    }
                    break;
                case "paraffin":
                    if (game.purchase(constants.waxPrice.paraffin)) {
                        game.resources.wax += amount
                        game.resources.globalWax -= amount
                    }
                    break;
                case "ear":
                    if (game.purchase(constants.waxPrice.ear)) {
                        game.resources.poshness -= amount
                        game.resources.wax += amount
                        game.resources.globalWax -= amount
                        if (!getChatContent().includes("Disgusting...")) {
                            writeToChat("Disgusting...")
                            writeHtmlToChat("<img style='margin:5px' src='img/disgusting.gif' width='150px' /><br>")
                        }
                    }
                    break;
            }
        } else {
            wax.buy(game.resources.globalWax, type)
        }
        if (game.resources.globalWax <= 0) {
            writeToChat("Global wax used up!")
            wax.autoBuyer = false
            document.getElementById("enable-auto-wax-buyer").checked = false
        }
        if (game.resources.poshness <= 0) {
            document.getElementById('poshness').classList.remove('glow')
        } else {
            // if not already glowing
            if (!document.getElementById('poshness').classList.contains('glow')) {
                document.getElementById('poshness').classList.add('glow')
            }
        }
    },
    enableQuantumWax() {
        document.querySelectorAll("#wax-market button").forEach(e => e.disabled = true)
        document.querySelectorAll("#wax-market input").forEach(e => e.disabled = true)
        wax.autoBuyer = false
    }
}


document.getElementById("buy-auto-wax-btn").addEventListener("click", function (e) {
    wax.unlock()
})


document.getElementById("auto-wax-unlock-price").innerHTML = formatWithCommas(constants.AUTO_BUY_WAX_UNLOCK_PRICE)