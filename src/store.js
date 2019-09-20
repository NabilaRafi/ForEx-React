import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const configureStore = createStoreWithMiddleware(rootReducer);

export default configureStore;