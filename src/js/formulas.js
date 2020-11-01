export default {
    computed: {
        arpa() {
            return this.inputs.mrr / this.inputs.customers;
        },
        ltv() {
            const churnFactor = this.inputs.churn ? 1 / (this.inputs.churn/100) : 1;
            return (0.5 * churnFactor * (2 * this.arpa)) * (this.inputs.margin/100);
        },
        arr() {
            return this.inputs.mrr * 12;
        },
        valuation() {
            return 10 * this.arr * (this.inputs.margin/100) * (this.inputs.growth/100) * (1 - this.inputs.churn/100);
        }
    }
}

