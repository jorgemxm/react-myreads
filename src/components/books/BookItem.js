import React from 'react';
import PropTypes from 'prop-types';


function BookItem(props) {

  // Props Deconstruction
  const {
    id,
    title,
    imageLinks,
    authors,
    shelvesOptions,
    onUpdateBookShelf
  } = props;

  const shelf = props.hasOwnProperty('shelf') ? props.shelf : false;

  // It creates a List of Authors for the current Book
  const authorsList = authors.map(author => (
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
            style={{ backgroundImage: `url("${ imageLinks.smallThumbnail }")` }}
          ></div>

          <div className="book-shelf-changer">
            <select
              defaultValue={ props.hasOwnProperty('shelf') ? props.shelf : false }
              onChange={ (evt) => { onUpdateBookShelf(id, shelf, evt.target.value) } }
            >
              <option value="none" disabled>Move to...</option>
              { shelvesOptions }
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authorsList }</div>

      </div>
    </li>
  )
}

BookItem.propTypes = {
  imageLinks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired
}

export default BookItem;
