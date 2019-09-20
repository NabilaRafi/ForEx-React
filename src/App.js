import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import ExchangeComponent from './exchange';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore;

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <ExchangeComponent />
      </Provider>
    </div>
  );
}

export default App;
