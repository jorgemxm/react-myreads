import React from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';
import { camelCaseToTitleCase } from '../../utils/utils';

function BookGrid(props) {

  const {
    books,
    shelvesAvailable,
    onUpdateBookShelf
  } = props;

  const shelvesOptions = shelvesAvailable.map(shelf => (
    <option key={ shelf } value={ shelf }>{ camelCaseToTitleCase(shelf) }</option>
  ));

  return (
    <ol className="books-grid">
      { books && books.map(book => (
        <BookItem
          key={ book.id }
          shelvesOptions={ shelvesOptions }
          onUpdateBookShelf={ onUpdateBookShelf }
          book={{...book }}
        />
      ))}
    </ol>
  )
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired,
  shelvesAvailable: PropTypes.array.isRequired
};

export default BookGrid;
