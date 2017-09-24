import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import * as booksUtils from './utils/booksUtils';
import './assets/css/App.css';

// Import Custom Components
import { Header } from './components/common';
import {
  BookShelf,
  Search
} from './components/books';

// Main Container Component
class BooksApp extends Component {
  state = {
    shelfs: {},
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({
        shelfs: booksUtils.mapBooksToShelfs(books)
      });
    })
  }

  render() {

    const { shelfs } = this.state;
    const bookShelfs = Object.keys(shelfs).map((shelf, index) => (
      <BookShelf key={ shelf } {...shelfs[shelf] } />
    ));

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <Header title="MyReads" />

            <div className="list-books-content">
              { bookShelfs }
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
