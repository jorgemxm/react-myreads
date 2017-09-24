import React from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

function BookGrid(props) {
  const { books } = props;

  return (
    <ol className="books-grid">
      { books && books.map(book => (
        <BookItem key={ book.id } { ...book } />
      ))}
    </ol>
  )
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookGrid;
