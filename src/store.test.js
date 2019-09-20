import configureStore from './store';

const suite = 'test store';

describe(suite, () => {
    test('should create store with default app state', function testConfigureStore() {
        const expected = {data: []};
        const actual = configureStore.getState();
        expect(actual).toEqual(expected);
    })
})