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
  books: PropTypes.arrayOf(PropTypes.object),
  shelfTitle: PropTypes.string.isRequired,
  shelvesAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
