document.getElementById("bee-wax-price").innerText = constants.waxPrice.bee
document.getElementById("paraffin-wax-price").innerText = constants.waxPrice.paraffin
document.getElementById("ear-wax-price").innerText = constants.waxPrice.ear

document.getElementById("buy-bee-wax").addEventListener("click", function (e) {
    buyWax("bee")
})

document.getElementById("buy-paraffin-wax").addEventListener("click", function (e) {
    buyWax("paraffin")

})
document.getElementById("buy-ear-wax").addEventListener("click", function (e) {
    buyWax("ear")
})


function buyWax(type) {
    switch (type) {
        case "bee":
            if (game.purchase(constants.waxPrice.bee)) {
                game.resources.poshness += 50
                game.resources.wax += 50
            }
            break;
        case "paraffin":
            if (game.purchase(constants.waxPrice.paraffin)) {
                game.resources.wax += 50
            }
            break;
        case "ear":
            if (game.purchase(constants.waxPrice.ear)) {
                game.resources.poshness -= 50
                game.resources.wax += 50
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