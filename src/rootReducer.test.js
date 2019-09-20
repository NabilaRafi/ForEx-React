
import rootReducer from './rootReducer';
const suite = 'test rootreducers';

const ActionTypes = {
    CONVERT_CURRENCY_SUCCESS: 'CONVERT_CURRENCY_SUCCESS',
    CONVERT_CURRENCY_FAILURE: 'CONVERT_CURRENCY_FAILURE',
}

describe(suite, function descRootReducerSuite() {
    test('should return initial state', function testRootReducer() {
        const expected = {data: []};
        const actual = rootReducer();
        expect(actual).toEqual(expected);
    })
    test('should handle CONVERT_CURRENCY_SUCCESS', () => {
        const state = rootReducer();
        const expected = {data: [{ hits: 'exchange rates' }] };
        const actual = rootReducer(state, {
            payload: [{hits: 'exchange rates'}],
            type: ActionTypes.CONVERT_CURRENCY_SUCCESS,
        })

        expect(actual).toEqual(expected);
        expect(actual).not.toBe(state);
    })

    test('should handle CONVERT_CURRENCY_FAILURE', () => {
        const state = rootReducer();
        const expected = { data: { error: 'failure'}};
        const actual = rootReducer(state, {
            payload: {error: 'failure'},
            type: ActionTypes.CONVERT_CURRENCY_FAILURE
        })
        expect(actual).not.toBe(state);
    })
})