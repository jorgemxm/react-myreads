import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';

import {
  BookShelf,
  Search
} from './components/books';

import { Header } from './components/common';

import './App.css';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <Header title="MyReads" />

            <div className="list-books-content">
              <BookShelf />
              <BookShelf />
              <BookShelf />
            </div>

            <div className="open-search btn-action">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          </div>
        )}
      </div>
    )
  }
}
export default BooksApp
