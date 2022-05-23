import { booksActionType } from '../constants/ActionTypes';
import createReducer from '../helpers/createReducer';

const initialState = {}

const fetchBooks = (state:any, action:any) => {
  const { books } = action;
  return {
    ...state,
    booksList: books
  }
}

const handlers = {
  [booksActionType.BOOKS_FETCH_SUCCEEDED]: fetchBooks
}

export default createReducer(initialState, handlers);
