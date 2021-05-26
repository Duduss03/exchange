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
                "PLN": {"PLN": {mid: 1, currency: "polski złoty", code: "PLN"}}
            }
        };
    }

    componentDidMount() {
        fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
            .then(res => res.json())
            .then(
                (result) => {
                    let exchangeRate = {"PLN": {mid: 1, currency: "polski złoty", code: "PLN"}};
                    let currencies = ["PLN"];
                    result[0].rates.forEach(rate => {
                        exchangeRate[rate.code] = rate;
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
        let exchangeRateForSourceCurrency = this.state.exchangeRate[this.state.fromCurrency].mid;
        let exchangeRateForTargetCurrency = this.state.exchangeRate[this.state.toCurrency].mid;
        this.setState({toValue: this.state.fromValue * exchangeRateForSourceCurrency / exchangeRateForTargetCurrency});
        event.preventDefault();
    }

    render() {
        return <div className="App App-header">
            <h1>Przelicznik walut</h1>
            <form id="exchangeForm" onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.fromValue}
                       onChange={this.handleFromValueChange}/>
                <select value={this.state.fromCurrency}
                        onChange={this.handleFromCurrencyChange}
                        title={this.state.exchangeRate[this.state.fromCurrency].currency}>
                    {this.state.currencies.map(
                        currency =>
                            <option key={currency}
                                    value={currency}
                                    title={this.state.exchangeRate[currency].currency}>
                                {currency}
                            </option>
                    )}
                </select>
                <input type="submit" value="Przelicz"/>
                <input type="text"
                       value={this.state.toValue.toFixed(2)}
                       disabled={true}
                       title={this.state.exchangeRate[this.state.toCurrency].currency}/>
                <select value={this.state.toCurrency}
                        onChange={this.handleToCurrencyChange}
                        title={this.state.exchangeRate[this.state.toCurrency].currency}>
                    {this.state.currencies.map(
                        currency =>
                            <option key={currency}
                                    value={currency}
                                    title={this.state.exchangeRate[currency].currency}>
                                {currency}
                            </option>
                    )}
                </select>
            </form>
        </div>
    }
}


export default App;
