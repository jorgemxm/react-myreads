import React from 'react';
import BookItem from './BookItem'

export default function BookGrid(props) {
  return (
    <ol className="books-grid">
      <BookItem title="The Hobbit" />
      <BookItem title="Book2" />
      <BookItem title="Book3" />
    </ol>
  )
}
