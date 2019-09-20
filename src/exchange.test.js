import React from 'react';
import renderer from 'react-test-renderer';
import Exchange from './exchange';

const testSuite = 'Test the currency exchange component';

describe(testSuite, function ExchangeCurrencyComponentSuite() {
    test('renders without breaking', () => {
        const component = renderer.create(
            <ExchangeComponent />
        ).toJSON();
        expect(component).toMatchSnapshot();
    })
})

