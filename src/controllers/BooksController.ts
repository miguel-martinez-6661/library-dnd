import axiosFetch from '.';

const params = 'category=libros_programacion'

const findBooks = async () => {
  const books = await axiosFetch.get(`/?${params}`);
  return books.data;
};

export { findBooks };
