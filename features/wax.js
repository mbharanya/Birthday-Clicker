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