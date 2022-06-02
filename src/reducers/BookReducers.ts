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

const removeBook = (state:any, action:any) => {
  const { bookId } = action.payload
  const booksList = [...state.booksList]
  const filteredBook = booksList.filter(book => book.ID !== bookId)

  return {
    ...state,
    booksList: filteredBook
  }
}

const handlers = {
  [booksActionType.BOOKS_FETCH_SUCCEEDED]: fetchBooks,
  [booksActionType.BOOKS_REMOVE_SUCCEEDED]: removeBook
}

export default createReducer(initialState, handlers);
