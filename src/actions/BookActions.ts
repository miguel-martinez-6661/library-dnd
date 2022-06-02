import { booksActionType } from '../constants/ActionTypes';
import { Book } from '../types/Book';

const fetchBooks = () => ({
  type: booksActionType.BOOKS_FETCH_REQUESTED
});

// Crear nueva accion
const removeBook = (bookId:number, books:Book[]) => ({
  type: booksActionType.BOOKS_REMOVE_REQUESTED,
  payload: { bookId, books }
});

export { fetchBooks, removeBook };
