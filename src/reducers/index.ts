// index.ts

import { combineReducers } from 'redux';
import postReducer from './postReducer'; // Import postReducer as default export

const rootReducer = combineReducers({
  posts: postReducer,
});

export { rootReducer };
