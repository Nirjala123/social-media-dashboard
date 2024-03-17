// store.ts

import { createStore } from 'redux';
import { rootReducer } from './reducers'; // Import rootReducer from the reducers directory

const store = createStore(rootReducer);

export default store;
