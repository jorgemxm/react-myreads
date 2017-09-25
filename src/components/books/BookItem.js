import React from 'react';
import PropTypes from 'prop-types';


function BookItem(props) {

  // Props Deconstruction
  const {
    book,
    shelvesOptions,
    onUpdateBookShelf
  } = props;

  const currentShelf = book.hasOwnProperty('shelf') ? book.shelf : false;

  // It creates a List of Authors for the current Book
  const authorsList = book.authors.map(author => (
    <span key={ author.replace(/\s/g, '')} className="book-author">
      - { author }<br />
    </span>
  ));

  return (
    <li>
      <div className="book">

        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: `url("${ book.imageLinks.smallThumbnail }")` }}
          ></div>

          <div className="book-shelf-changer">
            <select
              defaultValue={ currentShelf }
              onChange={ (evt) => { onUpdateBookShelf(book, evt.target.value) } }
            >
              <option value="none" disabled>Move to...</option>
              { shelvesOptions }
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ authorsList }</div>

      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  shelvesOptions: PropTypes.array.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
}

export default BookItem;
