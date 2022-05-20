import { booksActionType } from '../constants/ActionTypes';

const fetchBooks = () => ({
  type: booksActionType.BOOKS_FETCH_REQUESTED
})

export { fetchBooks }
