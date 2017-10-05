import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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

let testBook = {};
let testShelves = {};
let initialResponse = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, div
  );
});


beforeEach(() => {
  initialResponse = {
    books: [
      { id: 1, shelf: 'currentlyReading', title: 'React' },
      { id: 2, shelf: 'wantToRead', title: 'Design' },
      { id: 3, shelf: 'read', title: 'Games' }
    ]
  };

  testBook = { shelf: 'read', title: 'Games', id: 3 };

  testShelves = {
    currentlyReading: {
      books: [ { id: 1, title: 'React', shelf: 'currentlyReading' } ]
    },
    wantToRead: {
      books: [ { id: 2, title: 'Design', shelf: 'wantToRead' } ]
    },
    read: {
      books: [ { id: 3, title: 'Games', shelf: 'read' } ]
    },
  }
});


it('maps the API response to a custom data structure', () => {
  const expected = {
    currentlyReading: {
      shelfTitle: 'Currently Reading',
      books: [{ id: 1, shelf: 'currentlyReading', title: 'React' }]
    },
    wantToRead: {
      shelfTitle: 'Want To Read',
      books: [{ id: 2, shelf: 'wantToRead', title: 'Design' }]
    },
    read: {
      shelfTitle: 'Read',
      books: [{ id: 3, shelf: 'read', title: 'Games' }]
    }
  }

  const result = booksUtils.mapBooksToShelves(initialResponse.books);
  expect(result).toEqual(expected)

});



it('moves a book to another shelf', () => {
  const expected = {
    currentlyReading: {
      books: [
        { id: 1, title: 'React', shelf: 'currentlyReading' },
        { id: 3, title: 'Games', shelf: 'currentlyReading' }
      ]
    },
    wantToRead: {
      books: [ { id: 2, title: 'Design', shelf: 'wantToRead' } ]
    },
    read: {
      books: []
    }
  };

  const result = booksUtils.moveToShelf(testBook, 'currentlyReading', testShelves);
  expect(result).toEqual(expected);

});



test('moveToShelf should not mutate the existing books array', () => {
  const result = booksUtils.moveToShelf(testBook, 'read', testShelves);
  expect(result).not.toBe(testShelves);
})


it('removes a book from all the shelves', () => {
  const expected = {
    currentlyReading: {
      books: [ { id: 1, title: 'React', shelf: 'currentlyReading' } ]
    },
    wantToRead: {
      books: [ { id: 2, title: 'Design', shelf: 'wantToRead' } ]
    },
    read: {
      books: []
    }
  };

  const result = booksUtils.removeFromShelf(testBook, testShelves);
  expect(result).toEqual(expected);

});


/*
it('creates a list of the active book shelves', () => {
  const expected = [ 'currentlyReading', 'read', 'wantToRead' ];
  const result = booksUtils.getListOfActiveShelves(initialResponse.books);
  expect(result).toEqual(expected);
});
*/
