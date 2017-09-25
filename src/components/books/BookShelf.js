/**
* BookShelf Component
*/
import React from 'react';
import BookLayoutGrid from './BookLayoutGrid';
import PropTypes from 'prop-types';

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ props.shelfTitle }</h2>
      <div className="bookshelf-books">
        { props.books && (
          <BookLayoutGrid { ...props } />
        )}
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array,
  onUpdateBookShelf: PropTypes.func.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelvesAvailable: PropTypes.array.isRequired
};

export default BookShelf;
