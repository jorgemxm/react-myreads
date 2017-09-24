import React from 'react';
import BookItem from './BookItem';

export default function BookGrid(props) {
  const { books } = props;

  return (
    <ol className="books-grid">
      { books && books.map(book => (
        <BookItem key={ book.id } { ...book } />
      ))}
    </ol>
  )
}
