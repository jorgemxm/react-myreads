/**
* BookShelf Component
*/
import React from 'react';
import BookLayoutGrid from './BookLayoutGrid';

export default function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ props.shelfTitle }</h2>
      <div className="bookshelf-books">
        <BookLayoutGrid { ...props } />
      </div>
    </div>
  )
}
