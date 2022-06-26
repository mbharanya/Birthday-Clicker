const cpu = {
    cpuName: "Intel 8086",
    availableCpus: 1,
    cpuUsage: 0,
    setUsage: function (cpu) {
        if (cpu <= this.availableCpus) {
            this.cpuUsage = cpu
            return true
        }
        return false
    },
    updateUi: function () {
        document.getElementById("cpu-name").innerText = cpu.cpuName
        document.getElementById("available-cpus").innerText = formatWithCommas(cpu.availableCpus)
        document.getElementById("cpu-usage").innerText = formatWithCommas((cpu.cpuUsage / cpu.availableCpus) * 100)
    },
    upgradeCpu: function (amount) {
        for(let i = 0; i < amount; i++){
            if (game.purchase(this.nextCpuPrice())) {
                this.availableCpus += 1
                document.getElementById("buy-cpu-price").innerText = formatWithCommas(this.nextCpuPrice())
            }
        }
    },
    nextCpuPrice: function () {
        return constants.UPGRADE_CPU_PRICE * (this.availableCpus + 1)
    }
}


document.querySelectorAll(".buy-cpu-btn").forEach(b => b.addEventListener("click", function (e) {
    cpu.upgradeCpu(parseInt(e.target.dataset.amount))
}))

document.getElementById("buy-cpu-price").innerText = formatWithCommas(cpu.nextCpuPrice())