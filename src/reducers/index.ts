import { combineReducers } from 'redux';
import BookReducers from './BookReducers';

const rootReducer = combineReducers({
  books: BookReducers
  // other reducers hereq
})

export default rootReducer
