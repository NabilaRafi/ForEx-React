const initialState = {
    data:[],
};

const ActionTypes = {
    CONVERT_CURRENCY_SUCCESS: 'CONVERT_CURRENCY_SUCCESS',
    CONVERT_CURRENCY_FAILURE: 'CONVERT_CURRENCY_FAILURE',
}

const rootReducer = (state= initialState, action={}) => {
    switch(action.type) {
        case ActionTypes.CONVERT_CURRENCY_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case ActionTypes.CONVERT_CURRENCY_FAILURE:
            return { ...state, error: action.payload};
        default:
            return state;
    }
};

export default rootReducer;