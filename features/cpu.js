const cpu = {
    cpuName: "Intel 8086",
    availableCpus: 1,
    availableMemory: 0.5,
    cpuUsage: 0,
    memoryUsage: 0,
    setUsage: function (cpu, memory) {
        if (cpu <= this.availableCpus && memory <= this.availableMemory) {
            this.cpuUsage = cpu
            this.memoryUsage = memory
            return true
        }
        return false
    },
    upgradeCpu: function () {
        if (game.purchase(constants.UPGRADE_CPU_PRICE * this.availableCpus + 1)) {
            this.availableCpus += 1
            document.getElementById("buy-cpu-price").innerText = formatWithCommas(this.nextCpuPrice())
        }
    },
    nextCpuPrice: function () {
        return constants.UPGRADE_CPU_PRICE * (cpu.availableCpus + 1)
    }
}


document.getElementById("buy-cpu-btn").addEventListener("click", function () {
    cpu.upgradeCpu()
})

document.getElementById("buy-cpu-price").innerText = formatWithCommas(cpu.nextCpuPrice())