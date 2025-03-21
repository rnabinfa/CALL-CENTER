class CallCenterMonitor {
    constructor() {
        this.stats = {
            avgWaitTime: 0,
            utilization: 0,
            queueLength: 0
        };
        this.waitTimeHistory = [];
        this.utilizationHistory = [];
        this.setupCharts();
        this.startMonitoring();
    }

    setupCharts() {
        // Wait Time Chart
        this.waitTimeChart = new Chart(
            document.getElementById('waitTimeChart'),
            {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Average Wait Time',
                        data: []
                    }]
                }
            }
        );

        // Utilization Chart
        this.utilizationChart = new Chart(
            document.getElementById('utilizationChart'),
            {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Agent Utilization',
                        data: []
                    }]
                }
            }
        );
    }

    updateStats(stats) {
        this.stats = stats;
        this.waitTimeHistory.push(stats.avgWaitTime);
        this.utilizationHistory.push(stats.utilization);
        
        this.updateDisplay();
        this.updateCharts();
    }

    updateDisplay() {
        document.getElementById('avg-wait-time').textContent = 
            this.formatTime(this.stats.avgWaitTime);
        document.getElementById('agent-utilization').textContent = 
            `${Math.round(this.stats.utilization * 100)}%`;
        document.getElementById('queue-length').textContent = 
            this.stats.queueLength;
    }

    updateCharts() {
        // Update charts with new data
        this.waitTimeChart.data.labels = 
            Array(this.waitTimeHistory.length).fill().map((_, i) => i);
        this.waitTimeChart.data.datasets[0].data = this.waitTimeHistory;
        this.waitTimeChart.update();

        this.utilizationChart.data.labels = 
            Array(this.utilizationHistory.length).fill().map((_, i) => i);
        this.utilizationChart.data.datasets[0].data = this.utilizationHistory;
        this.utilizationChart.update();
    }

    formatTime(minutes) {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}:${mins.toString().padStart(2, '0')}`;
    }

    startMonitoring() {
        setInterval(() => {
            // Simulate getting real stats
            this.updateStats({
                avgWaitTime: Math.random() * 30,
                utilization: Math.random(),
                queueLength: Math.floor(Math.random() * 20)
            });
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const monitor = new CallCenterMonitor();
});
