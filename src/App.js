import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currencies: ["PLN"],
            fromValue: 1,
            fromCurrency: "PLN",
            toCurrency: "PLN",
            toValue: 1,
            exchangeRate: {
                "PLN": 1
            }
        }
    }

    componentDidMount() {
        fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
            .then(res => res.json())
            .then(
                (result) => {
                    let exchangeRate = {"PLN": 1}
                    let currencies = ["PLN"]
                    result[0].rates.forEach(rate => {
                        exchangeRate[rate.code] = rate.mid
                        currencies.push(rate.code);
                    })
                    this.setState({
                        currencies,
                        exchangeRate
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    handleFromCurrencyChange = (event) => {
        this.setState({fromCurrency: event.target.value});
    }

    handleFromValueChange = (event) => {
        this.setState({fromValue: event.target.value});
    }

    handleToCurrencyChange = (event) => {
        this.setState({toCurrency: event.target.value});
    }

    handleSubmit = (event) => {
        let exchangeRateForSourceCurrency = this.state.exchangeRate[this.state.fromCurrency];
        let exchangeRateForTargetCurrency = this.state.exchangeRate[this.state.toCurrency];
        this.setState({toValue: this.state.fromValue * exchangeRateForSourceCurrency / exchangeRateForTargetCurrency});
        event.preventDefault();
    }

    render() {
        return <div>
            <div>Przelicznik walut</div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.fromValue} onChange={this.handleFromValueChange}/>
                <select value={this.state.fromCurrency} onChange={this.handleFromCurrencyChange}>
                    {this.state.currencies.map(
                        currency =>
                            <option key={currency} value={currency}>{currency}</option>
                    )}
                </select>
                <input type="submit" value="Przelicz"/>
                <input type="text" value={this.state.toValue.toFixed(2)} disabled={true}/>
                <select value={this.state.toCurrency} onChange={this.handleToCurrencyChange}>
                    {this.state.currencies.map(
                        currency =>
                            <option key={currency} value={currency}>{currency}</option>
                    )}
                </select>
            </form>
        </div>
    }
}


export default App;
