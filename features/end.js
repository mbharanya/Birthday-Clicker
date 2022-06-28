document.querySelector(".endgame-decision-btn").addEventListener("click", function (e) {
    e.target.style.display = "none";
    const endDate = new Date()
    const hours = parseInt(Math.abs(endDate - game.startTime) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(endDate.getTime() - game.startTime.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(endDate.getTime() - game.startTime.getTime()) / (1000) % 60);

    const endgameStats = document.getElementById("endgame-statistics")
    endgameStats.style.display = "block";
    endgameStats.innerHTML = `
        <h2>Statistics</h2>
        <i>Happy Birthday! Thanks for playing!</i><br/>
        <table>
            <tr>
                <td><h1> ${game.candles} (${spellf(game.candles)}) candles produced!</h1></td>
            </tr>
            <tr>
                <td>Clicked the make candle button ${stats.manuallyClicked} times</td>
            </tr>
            <tr>
                <td>${spellf(game.resources.globalWax)} wax left over</td>
            </tr>
            <tr>
                <td>${spellf(game.resources.money)}$ left, ${spellf(stats.spentMoney)}$ spent, ${spellf(stats.moneyEarned)}$ earned</td>
            </tr>
            <tr>
                <td>${spellf(game.resources.poshness)} poshness collected</td>
            </tr>
            <tr>
                <td>${spellf(marketManipulator.level)} ${game.resources.poshness < 0 ? "Kneecaps broken" : "Competitors bought"}</td>
            </tr>
            <tr>
                <td>${hours} hours ${minutes} minutes ${seconds} seconds played</td>
            </tr>
        </table>
    `
})