import React from 'react';
import PropTypes from 'prop-types';


function BookItem(props) {

  const noImageThumbnail = '//books.google.com/books/content?id=notfound&img=1&zoom=1&source=gbs_api';

  // Props Deconstruction
  const {
    book,
    shelvesOptions,
    onUpdateBookShelf
  } = props;

  const currentShelf = book.hasOwnProperty('shelf') ? book.shelf : 'none';

  // It creates a List of Authors for the current Book
  // NOTE: There are books without authors. eg: Search for "Painting" or "Baseball"
  const authorsList = (book.authors) && book.authors.map(author => (
    <span key={ author.replace(/\s/g, '')} className="book-author">
      - { author }<br />
    </span>
  ));

  // NOTE: Provide a Default image since There are books without Covers.
  // eg: Search for "Design", "Virtual Reality" or "Time"
  let thumbnail = (book.hasOwnProperty('imageLinks'))
    ? book.imageLinks.smallThumbnail
    : noImageThumbnail;

  // Remove URL Protocol in order to avoid Mixed Content issues
  // (Loading content over HTTP & HTTPS at the same time)
  thumbnail = thumbnail.replace(/^https?:/, '');

  return (
    <li>
      <div className="book">

        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: `url("${ thumbnail }")` }}
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
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.object,
    shelf: PropTypes.string
  }).isRequired,
  shelvesOptions: PropTypes.arrayOf(PropTypes.element).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookItem;
