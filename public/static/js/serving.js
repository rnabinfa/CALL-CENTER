class Customer {
    constructor(data) {
        this.id = data.id;
        this.name = data.firstName + ' ' + data.lastName;
        this.priority = ['Normal', 'Corporate', 'VIP'][Math.floor(Math.random() * 3)];
        this.serviceTime = Math.floor(Math.random() * 10) + 1;
    }
}

class Agent {
    constructor(data) {
        this.id = data.id;
        this.name = data.firstName + ' ' + data.lastName;
        this.maxWorkload = 3;
        this.currentWorkload = 0;
        this.available = true;
    }
}

class CallCenter {
    constructor() {
        this.customerQueue = [];
        this.agents = [];
        this.schedulingStrategy = 'priority'; // 'priority', 'roundRobin', 'shortestJob'
        this.init();
    }

    async init() {
        // Fetch dummy users for customers and agents
        const response = await fetch('https://dummyjson.com/users?limit=30');
        const data = await response.json();
        
        // Create agents from first 5 users
        this.agents = data.users.slice(0, 10).map(user => new Agent(user));
        
        // Create initial customers from remaining users
        this.customerQueue = data.users.slice(5).map(user => new Customer(user));
        
        this.render();
        this.startSimulation();
    }

    render() {
        this.renderCustomerQueue();
        this.renderAgents();
    }

    renderCustomerQueue() {
        const queueEl = document.getElementById('customer-queue');
        queueEl.innerHTML = this.customerQueue
            .map(customer => `
                <div class="flex items-center justify-between p-2 border rounded ${this.getPriorityColor(customer.priority)}">
                    <span>${customer.name}</span>
                    <span class="badge">${customer.priority}</span>
                </div>
            `).join('');
    }

    renderAgents() {
        const agentsEl = document.getElementById('active-agents');
        agentsEl.innerHTML = this.agents
            .map(agent => `
                <div class="p-2 border rounded ${agent.available ? 'bg-green-100' : 'bg-red-100'}">
                    <div>${agent.name}</div>
                    <div>Workload: ${agent.currentWorkload}/${agent.maxWorkload}</div>
                </div>
            `).join('');
    }

    getPriorityColor(priority) {
        return {
            'VIP': 'bg-purple-100',
            'Corporate': 'bg-blue-100',
            'Normal': 'bg-gray-100'
        }[priority];
    }

    startSimulation() {
        setInterval(() => {
            this.assignCustomers();
            this.render();
        }, 5000);
    }

    assignCustomers() {
        // Implement different scheduling strategies
        switch(this.schedulingStrategy) {
            case 'priority':
                this.priorityScheduling();
                break;
            case 'roundRobin':
                this.roundRobinScheduling();
                break;
            case 'shortestJob':
                this.shortestJobScheduling();
                break;
        }
    }
}

const callCenter = new CallCenter();
