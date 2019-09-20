import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertCurrency } from './action';

class ExchangeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeToPocket: 0,
            activeFromPocket: 0,
            currencyToConvert: '',
            conversionBal: 0,
            error: false,
            fromData : [
                {
                    currency: 'GBP',
                    balance: 500.88
                },
                {
                    currency: 'INR',
                    balance: 800.66
                },
                {
                    currency: 'USD',
                    balance: 360.77 
                }
            ],
            toData : [
                {
                    currency: 'GBP',
                    balance: 500.88,
                },
                {
                    currency: 'INR',
                    balance: 800.66,
                },
                {
                    currency: 'USD',
                    balance: 360.77,
                }
            ]
        }
        this.onChange = this.onChange.bind(this);
        this.updateFromPocket = this.updateFromPocket.bind(this);
        this.updateToPocket = this.updateToPocket.bind(this);
        this.doExchange = this.doExchange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { convertedValue } = nextProps;
        convertedValue && this.setState({
            conversionBal: convertedValue
        })
    }

    async onChange(e) {
        const { activeToPocket, activeFromPocket, fromData, toData } = this.state;
        //update the currency state
        await this.setState({
            currencyToConvert: Number(e.target.value).toFixed(2),
        })
        
        // console.log(new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(this.state.currency));
        if(activeFromPocket === activeToPocket) {
            this.setState({ conversionBal: this.state.currencyToConvert})
        } else {
            const fromCurrency = fromData[activeFromPocket].currency;
            const toCurrency = toData[activeToPocket].currency;
            this.props.convertCurrency(this.state.currencyToConvert, fromCurrency, toCurrency);
        }
    }

    async doExchange() {
        const { currencyToConvert, activeFromPocket, fromData, toData, activeToPocket, conversionBal } = this.state;
        const fromUserBalances = fromData.map(index => index.balance);
        const toUserBalances = toData.map(index => index.balance);
        let fromActiveBalance = fromUserBalances[activeFromPocket];
        let toActiveBalance = toUserBalances[activeToPocket];
        if (currencyToConvert <= fromActiveBalance) {
            fromActiveBalance = fromActiveBalance - currencyToConvert;
            toActiveBalance = toActiveBalance + parseFloat(conversionBal);
            this.setState( state => {
                const fromData = state.fromData.map((element, index) => {
                    if(index === activeFromPocket) {
                        return element.balance = fromActiveBalance;
                    }
                    return element;
                })
                return fromData;                
            })
            this.setState( state => {
                const toData = state.toData.map((element, index) => {
                    if(index === activeToPocket) {
                        return element.balance = toActiveBalance;
                    }
                    return element;
                })
                return toData;                
            })
        } else {
            await this.setState({
                error: 'true',
            })
        }

    }

    updateFromPocket(e) {
        this.setState({
            activeFromPocket: e,
            conversionBal: '',
            currencyToConvert: '',
        })
    }

    updateToPocket(e) {
        this.setState({
            activeToPocket: e,
            conversionBal: '',
            currencyToConvert: '',
        })
    }

    render() {
        const { toData, fromData, error } = this.state;

        const toConvertPocket = fromData.map( (element, index) => 
            <CarouselItem elementIndex={index}>
                <h1>{element.currency}</h1>
                <p className="carousel-copy">You have <strong>{element.balance}</strong></p>
                <div className="input-group mb-2">
                <input type='number' min="0"  step="any" onChange={this.onChange}  value={this.state.currencyToConvert}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={this.doExchange}>Exchange</button>
                    </div>
                </div>
                {
                    error && 
                        <div className="alert alert-danger" role="alert">
                            You don't have sufficient balance
                        </div>
                }
            </CarouselItem>
        )
        const convertedPocket = toData.map((element, index) => 
            <CarouselItem>
                <h1>{element.currency}</h1>
                <p className="carousel-copy">You have <strong>{element.balance}</strong></p>
                <h2>{this.state.conversionBal}</h2>
            </CarouselItem>
        )

        return (
            <div>
                <Carousel
                    indicators={true}
                    nextIcon={false}
                    prevIcon={false}
                    interval={null}
                    touch={true}
                    slide={true}
                    onSelect={this.updateFromPocket}
                >
                    {toConvertPocket}
                </Carousel>
                <Carousel
                    indicators={true}
                    nextIcon={false}
                    prevIcon={false}
                    interval={null}
                    touch={true}
                    slide={true}
                    onSelect={this.updateToPocket}
                >
                    {convertedPocket}
                </Carousel>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    convertedValue: state.data,
})


ExchangeContainer.propTypes = {
    convertCurrency: PropTypes.func,
    convertedValue: PropTypes.array,
}

const ExchangeComponent = connect(
    mapStateToProps, 
    {convertCurrency}
)(ExchangeContainer);

export default ExchangeComponent;