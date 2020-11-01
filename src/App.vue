<template>
  <div class="calculator">
    <div class="left-side">
        <h2>SaaS Valuation Calculator</h2>
        <div class="card">
            <h3>Product Metrics</h3>
            <div class="name-val">
                <label>Number of customers</label>
                <span class="val">
                    <input type="text" v-model="customers"/>
                </span>
            </div>
            <div class="name-val">
                <label>Monthly recurring revenue</label>
                <span class="val">
                    <input type="text" v-model="mrr"/>
                </span>
            </div>
            <div class="name-val">
                <label>Gross Margin</label>
                <span class="val">
                    <input type="text" v-model="margin"/>
                </span>
            </div>
            <div class="name-val">
                <label>Churn rate</label>
                <span class="val">
                    <input type="text" v-model="churn"/>
                </span>
            </div>
            <div class="name-val">
                <label>Growth rate</label>
                <span class="val">
                    <input type="text" v-model="growth"/>
                </span>
            </div>
        </div>
        <div class="card">
            <h3>Or auto-import metrics from...</h3>
            <div class="logos">
                <img src="./assets/qb-logo.svg"/>
                <img src="./assets/Square-Logo.png"/>
            </div>
            <div class="logos">
                <img src="./assets/stripe.png"/>
            </div>
        </div>
    </div>
    <div class="right-side">
        <div class="card">
            <h3>Valuation Results</h3>
            <div class="card-parts">
                <div>
                    <h1>{{currency(ltv, true)}}</h1>
                    <p>Long Term Value (LTV)</p>
                </div>
                <div>
                    <h1>{{currency(valuation, true)}}</h1>
                    <p>Company Valuation</p>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="card email">
                <h3 v-if="sent">Thank you! We will be in touch soon.</h3>
                <div v-else>
                    <h3>Share valuation with us</h3>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your business email"
                    />
                    <button @click="submit">Submit</button>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
import VueMixinTween from './js/tween-mixin.js';
import FormulaMixin from './js/formulas';
const MILLION = 1000000;
export default {
    name: 'App',
    data() {
        return {
            MILLION,
            email: '',
            sent: false,
            inputs: {
                customers: 100,
                mrr: 1000,
                margin: 90,
                churn: 4,
                growth: 40
            }
        }
    },
    mixins: [
        FormulaMixin,
        VueMixinTween('ltv'),
        VueMixinTween('valuation'),
    ],
    computed: {
        customers: {
            get() {
                return new Intl.NumberFormat('en-US').format(this.inputs.customers);
            },
            set(val) {
                this.inputs.customers = this.toNumber(val);
            }
        },
        mrr: {
            get() {
                return this.currency(this.inputs.mrr);
            },
            set(val) {
                this.inputs.mrr = this.toNumber(val);
            }
        },
        margin: {
            get() {
                return this.inputs.margin + '%';
            },
            set(val) {
                this.inputs.margin = this.toNumber(val)
            }
        },
        churn: {
            get() {
                return this.inputs.churn + '%';
            },
            set(val) {
                this.inputs.churn = this.toNumber(val);
            }
        },
        growth: {
            get() {
                return this.inputs.growth + '%';
            },
            set(val) {
                this.inputs.growth = this.toNumber(val);
            }
        }
    },
    methods: {
        toNumber(val) {
            return Number(val.replace('%','').replace('$','').replace(/,/g,'')) || 0;
        },
        percent(val) {
            val = val || 0;
            if (val == Infinity) {
                return '0%';
            }
            return new Intl.NumberFormat('en-US', { style: 'percent' }).format(val);
        },
        currency(val, compact) {
            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: compact ? 'compact' : 'standard'
            }).format(val || 0);
            return compact ? formattedValue : formattedValue.split('.')[0];
        },
        submit() {
            if (!this.email) {
                return;
            }
            this.sent = true;
        }
    }
}
</script>
<style lang="less">
    @import './styles/global.less';

    .calculator {
        .left-side {
            padding: 1em;
            @media (min-width: @desktop) {
                padding: 4em;
                max-width: 800px;
                margin-left: auto;
            }
            .card {
                padding: 2em;
                margin-top: 1.5em;
            }
            .logos {
                display: flex;
                align-items: center;
                justify-content: space-around;
                img {
                    max-width: 200px;    
                }
            }
        }
        .right-side {
            padding: 4em;
            background-color: @color-gray;
            text-align: center;
            .card {
                padding: 2em;
                padding-bottom: 1em;
                @media (min-width: @desktop) {
                    margin-top: 4.5em;
                    max-width: 464px;
                }
                &.email {
                    input {
                        width: 30ch;
                        border: 1px solid @color-border;
                        border-radius: 3px;
                        margin: 1em;
                    }
                    button {
                        border: none;
                        background-color: @color-orange;
                        color: white;
                        padding: 0.5em 1.5em;
                        border-radius: 2px;
                        font-weight: 800;;
                    }                    
                }
            }
            .card-parts {
                @media (min-width: @desktop) {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    > div {
                        width: 50%;
                        margin-bottom: 2em;
                    }
                }
            }
        }
        @media (min-width: @desktop) {
            display: flex;
            .left-side {
                width: 60%;
            }
            .right-side {
                width: 40%;
                min-height: 100vh;
            }
        }   
    }

</style>
