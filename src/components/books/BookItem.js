import React from 'react';
import PropTypes from 'prop-types';


function BookItem(props) {

  // It creates a List of Authors for the current Book
  const authorsList = props.authors.map(author => (
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
            style={{ backgroundImage: `url("${ props.imageLinks.smallThumbnail }")` }}
          ></div>

          <div className="book-shelf-changer">
            <select
              defaultValue={ props.hasOwnProperty('shelf') ? props.shelf : false }
            >
              <option value="none" disabled>Move to...</option>
              { props.shelvesOptions }
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{ props.title }</div>
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
