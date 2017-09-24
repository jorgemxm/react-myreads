import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as BooksAPI from './utils/BooksAPI';


//-----------------------------------
// JEST Info
// ---
// it() - Run this test
// xit() - exclude this test
// fit() - exclude other tests
//-----------------------------------

let currentBook = {};
let allBooks = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
