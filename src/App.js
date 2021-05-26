import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currencies: ["EUR", "PLN"],
            fromValue: 1,
            fromCurrency: "EUR",
            toCurrency: "EUR",
            toValue: 1,
            exchangeRate: {
                "EUR": 1,
                "PLN": 4.53
            }
        }
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
        let exchangeRateForCurrency = this.state.exchangeRate[this.state.toCurrency];
        this.setState({toValue: this.state.fromValue * exchangeRateForCurrency});
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
                <input type="text" value={this.state.toValue} disabled={true}/>
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
