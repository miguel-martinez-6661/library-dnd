import { all, call, put, takeLatest } from 'redux-saga/effects';
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

function * removeBook(action:any):any {
  const { payload } = action
  try {
    yield put({
      type: booksActionType.BOOKS_REMOVE_SUCCEEDED,
      payload
    });
  } catch (e: any) {
    yield put({
      type: booksActionType.BOOKS_REMOVE_ERROR,
      error: e.message
    });
  }
}

function * bookSaga() {
  yield takeLatest(booksActionType.BOOKS_FETCH_REQUESTED, fetchBooks);
}

function * removeBookSaga() {
  yield takeLatest(booksActionType.BOOKS_REMOVE_REQUESTED, removeBook);
}

export default function * rootSaga() {
  yield all([
    bookSaga(),
    removeBookSaga()
  ])
}
