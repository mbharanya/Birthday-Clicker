const cpu = {
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
    }
}

