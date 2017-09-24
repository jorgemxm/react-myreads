import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import * as booksUtils from './utils/booksUtils';
import './assets/css/App.css';

// Import Custom Components
import { Header } from './components/common';
import { BookShelf, Search } from './components/books';

// Main Container Component
class BooksApp extends Component {
  state = {
    shelfs: {}
  }
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

        {/* ROUTE: Home Page */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header title="MyReads" />

            <div className="list-books-content">
              { bookShelfs }
            </div>

            <div className="open-search btn-action">
              <Link to="/search">Add a book</Link>
            </div>

          </div>
        )} />

        {/* ROUTE: Search Page */}
        <Route path="/search" component={ Search } />

      </div>
    )
  }
}

export default BooksApp;
