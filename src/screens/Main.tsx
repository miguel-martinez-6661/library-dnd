import React, { useCallback, useEffect, useState } from 'react';
import { Book as BookType } from '../types/Book';
import update from 'immutability-helper';
import { Grid, Text } from '@nextui-org/react';
import Book from '../components/Book';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../actions/BookActions';
import { getBooks } from '../selectors';
import './styles.css';

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => getBooks(state));

  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch])

  useEffect(() => {
    setBooks(data)
  }, [data])

  const moveBook = useCallback((dragIndex: number, hoverIndex: number) => {
    setBooks((prevBooks: BookType[]) =>
      update(prevBooks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBooks[dragIndex] as BookType]
        ]
      })
    );
  }, []);

  const renderBook = useCallback((b: BookType, index: number) => {
    return (
      <Book
        id={b.ID}
        key={b.ID}
        photoUrl={b.cover}
        text={b.title}
        index={index}
        moveBook={moveBook}
      />
    );
  }, [moveBook])

  return (
    <div className='container'>
      <Text
        h1
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%'
        }}
        weight="bold"
      >
        Programming Books
      </Text>
      <Grid.Container gap={2} className="p-5">
        {books?.map?.((b: BookType, index) => renderBook(b, index))}
      </Grid.Container>
    </div>
  )
}

export default Main;
