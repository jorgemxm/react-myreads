import React from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';
import { camelCaseToTitleCase } from '../../utils/helpers';

function BookGrid(props) {

  const {
    books,
    shelvesAvailable,
    onUpdateBookShelf,
    findBookShelf
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
          findBookShelf={ findBookShelf }
          book={{...book }}
        />
      ))}
    </ol>
  )
}

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  findBookShelf: PropTypes.func,
  shelvesAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookGrid;
