import axios from 'axios';

const ActionTypes = {
    CONVERT_CURRENCY_SUCCESS: 'CONVERT_CURRENCY_SUCCESS',
    CONVERT_CURRENCY_FAILURE: 'CONVERT_CURRENCY_FAILURE',
}

const pollInterval = 10000;

export const convertCurrencySuccess = (response, value, toCurrency) => {
    if(response.rates !== null) {
        const convertedValue = (response.rates[toCurrency])*value;
        return {
            type: ActionTypes.CONVERT_CURRENCY_SUCCESS,
            payload: convertedValue,
        };
    }

    return {
        type: ActionTypes.CONVERT_CURRENCY_FAILURE,
        payload: {
            error: response,
        },
    };
};

export const convertCurrencyFailure = (error) => ({
    type: ActionTypes.CONVERT_CURRENCY_FAILURE,
    payload: error,
});


export const convertCurrency = (value, fromCurrency, toCurrency) => (dispatch) => {
    axios({
        method: 'get',
        url: `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${fromCurrency},${toCurrency}`,
        headers: {'content-type': 'application/json'},
    })
    .then((response) => dispatch(convertCurrencySuccess(response.data, value, toCurrency)))
    .catch((error) => dispatch(convertCurrencyFailure(error)));
    setInterval(()=>{
        dispatch(convertCurrency(value, fromCurrency, toCurrency))
    }, pollInterval)
}


