const App = {
    data() {
        return {
            currencies: [],
            rates: 0,
            inp_text: '',
            amount: 0,
            currency_from: '',
            currency_to: '',
            base_currency: 'RUB',
            rates_data: null
        }
    },
    methods: {
        convertCurrency() {
            let words = this.inp_text.split(' ')
            this.amount = Number(words[0])
            this.currency_from = words[1].toUpperCase()
            this.currency_to = words[3].toUpperCase()
            let from_to = `${this.currency_from}_${this.currency_to}`
            console.log(this.amount, from_to)
            axios
                .get(`https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=8f9449565df67eb8519d`)
                .then(response => this.rates = response.data[from_to].toFixed(2) * this.amount);
        },
        printRates() {
            axios
            .get(`https://freecurrencyapi.net/api/v2/latest?apikey=21a22640-9887-11ec-9769-bf6cd6ccb580&base_currency=${this.base_currency.toUpperCase()}`)
            .then(response => this.rates_data = response.data.data)
        }
    },
    mounted() {
        axios
            .get('https://free.currconv.com/api/v7/currencies?apiKey=8f9449565df67eb8519d')
            .then(response => {
                for(key in response.data.results) {
                    this.currencies.push(key)
                }
            })
        // axios
        //     .get(`https://freecurrencyapi.net/api/v2/latest?apikey=21a22640-9887-11ec-9769-bf6cd6ccb580&base_currency=${this.base_currency.toUpperCase()}`)
        //     .then(response => this.rates_data = response.data.data)
    }
}

Vue.createApp(App).mount('#app')