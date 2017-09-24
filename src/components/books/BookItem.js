import React from 'react';

export default function BookItem(props) {
  const authors = props.authors.map(author => (
    <span
      key={ author.replace(/\s/g, '')}
      className="book-author">
      - { author }
      <br />
    </span>
  ));

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url("${ props.imageLinks.smallThumbnail }")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ props.title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    </li>
  )
}
