import { call, put, takeLatest } from 'redux-saga/effects';
import { booksActionType } from '../constants/ActionTypes';
import { findBooks } from '../controllers/BooksController';

function * fetchBooks() {
  try {
    // @ts-ignore
    const books = yield call(findBooks);
    yield put({
      type: booksActionType.BOOKS_FETCH_SUCCEEDED,
      books
    });
  } catch (e: any) {
    yield put({
      type: booksActionType.BOOKS_FETCH_ERROR,
      error: e.message
    });
  }
}

function * bookSaga() {
  yield takeLatest(booksActionType.BOOKS_FETCH_REQUESTED, fetchBooks);
}

export { bookSaga };
