This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Description:


Currency-Exchange:

Currency-Exchange allows the user to know the Exchange rate for the given amount. At the moment 3 Foreign currencies are supported GBP, INR, USD. Every 10 seconds once the data is refreshed. It allows the user to exchange the currencies and update both the currency balances. Prevents the user from exchangin if there is insufficient balance.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Tech stack
- React 16
- Redux
- Redux thunk
- axios
- ExchangeRates api for FOREX rate
- CSS3, React Bootstrap 4
- Jest

### Improvements:

- Cost efficient solution to fetch the api's using memorization techniques
- Unit testing in more granular level - refactor it again for reduce bugs
- rounding off the currencies to decimal fractions after conversion


