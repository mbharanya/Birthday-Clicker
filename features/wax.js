document.getElementById("bee-wax-price").innerText = constants.wax.bee
document.getElementById("paraffin-wax-price").innerText = constants.wax.paraffin
document.getElementById("ear-wax-price").innerText = constants.wax.ear

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
            if (game.purchase(constants.wax.bee)) {
                game.resources.poshness += 50
                game.resources.wax += constants.wax.bee
            }
            break;
        case "paraffin":
            if (game.purchase(constants.wax.paraffin)) {
                game.resources.wax += constants.wax.paraffin
            }
            break;
        case "ear":
            if (game.purchase(constants.wax.ear)) {
                game.resources.poshness -= 50
                game.resources.wax += constants.wax.ear
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