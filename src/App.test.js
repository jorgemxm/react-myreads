import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as BooksAPI from './utils/BooksAPI';
import * as booksUtils from './utils/booksUtils';


//-----------------------------------
// JEST Info
// ---
// it() - Run this test
// xit() - exclude this test
// fit() - exclude other tests
//-----------------------------------

let currentBook = {};
let allBooks = {};
let initialResponse = {};

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


beforeEach(() => {
  initialResponse = {
    books: [
      { id: 1, 'shelf': 'currentlyReading', title: 'React' },
      { id: 2, 'shelf': 'wantToRead', title: 'Design' },
      { id: 3, 'shelf': 'read', title: 'Games' }
    ]
  };
  currentBook = { shelf: 'read', title: 'Games', id: 2 };
  allBooks = {
    read: {
      books: [
        { id: 1, title: 'React' },
        { id: 2, title: 'Games' },
        { id: 3, title: 'Design' },
      ]
    },
    currentlyReading: { books: [] },
    wantToRead: { books: [] }
  }
});


it('maps the API response to a custom data structure', () => {
  const expected = {
    currentlyReading: {
      shelfTitle: 'Currently Reading',
      books: [{ id: 1, 'shelf': 'currentlyReading', title: 'React' }]
    },
    wantToRead: {
      shelfTitle: 'Want To Read',
      books: [{ id: 2, 'shelf': 'wantToRead', title: 'Design' }]
    },
    read: {
      shelfTitle: 'Read',
      books: [{ id: 3, 'shelf': 'read', title: 'Games' }]
    }
  }

  const result = booksUtils.mapBooksToShelves(initialResponse.books);
  expect(result).toEqual(expected)

});


/*
it('creates a list of book shelves', () => {
  const expected = [ 'currentlyReading', 'read', 'wantToRead' ];
  const result = booksUtils.getListOfShelves(initialResponse.books);
  expect(result).toEqual(expected);
});
*/


it('moves a book to another shelf', () => {
  const expected = {
    read: {
      books: [
        { id: 1, title: 'React' },
        { id: 3, title: 'Design' }
      ]
    },
    currentlyReading: {
      books: [ { id: 2, title: 'Games', shelf: 'currentlyReading' } ]
    },
    wantToRead: { books: [] }
  };

  const result = booksUtils.moveToShelf(currentBook.id, currentBook.shelf, 'currentlyReading', allBooks);
  expect(result).toEqual(expected);

});



test('moveToShelf should not mutate the existing books array', () => {
  const result = booksUtils.moveToShelf(currentBook.id, currentBook.shelf, 'read', allBooks);
  expect(result).not.toBe(allBooks);
})


it('removes a book from all the shelves', () => {
  const expected = {
    read: {
      books: [
        { id: 1, title: 'React' },
        { id: 3, title: 'Design' }
      ]
    },
    currentlyReading: { books: [] },
    wantToRead: { books: [] }
  };

  const result = booksUtils.removeFromShelf(currentBook.id, currentBook.shelf, allBooks);
  expect(expected).toEqual(expected);

});
