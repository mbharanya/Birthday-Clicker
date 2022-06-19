
document.getElementById("bee-wax-price").innerText = constants.waxPrice.bee
document.getElementById("paraffin-wax-price").innerText = constants.waxPrice.paraffin
document.getElementById("ear-wax-price").innerText = constants.waxPrice.ear



document.getElementById("buy-bee-wax").addEventListener("click", function (e) {
    wax.buy("bee")
})

document.getElementById("buy-paraffin-wax").addEventListener("click", function (e) {
    wax.buy("paraffin")

})
document.getElementById("buy-ear-wax").addEventListener("click", function (e) {
    wax.buy("ear")
})


document.getElementById("enable-auto-wax-buyer").addEventListener("change", function (e) {
    wax.autoBuyer = this.checked
    wax.waxAutoBuyType = document.querySelector('input[name="auto-buy-wax"]:checked').value
})


const wax = {
    autoBuyer: false,
    waxAutoBuyType: "bee",
    buy: (type) => {
        if (!type && wax.autoBuyer){
            type = document.querySelector('input[name="auto-buy-wax"]:checked').value
        }
        switch (type) {
            case "bee":
                if (game.purchase(constants.waxPrice.bee)) {
                    game.resources.poshness += 100
                    game.resources.wax += 100
                    game.resources.globalWax -= 100
                }
                break;
            case "paraffin":
                if (game.purchase(constants.waxPrice.paraffin)) {
                    game.resources.wax += 100
                    game.resources.globalWax -= 100
                }
                break;
            case "ear":
                if (game.purchase(constants.waxPrice.ear)) {
                    game.resources.poshness -= 100
                    game.resources.wax += 100
                    game.resources.globalWax -= 100
                    if (!getChatContent().includes("Disgusting...")) {
                        writeToChat("Disgusting...")
                        writeHtmlToChat("<img style='margin:5px' src='img/disgusting.gif' width='150px' /><br>")
                    }
                }
                break;
        }
        if (game.resources.poshness <= 0) {
            document.getElementById('poshness').classList.remove('glow')
        } else {
            // if not already glowing
            if (!document.getElementById('poshness').classList.contains('glow')) {
                document.getElementById('poshness').classList.add('glow')
            }
        }
    }
}


document.getElementById("buy-auto-wax-btn").addEventListener("click", function (e) {
    if (game.purchase(200)){
        document.getElementById("wax-auto-buy-paywall").classList.remove("paywall")
        document.getElementById("buy-auto-wax-btn").remove()
    }
})