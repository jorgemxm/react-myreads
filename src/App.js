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
    shelves: {},
    shelvesAvailable: []
  }

  componentDidMount() {
    this.loadData();
  }


  loadData() {

    BooksAPI.getAll()
    .then(books => {
      this.setState({
        shelves: booksUtils.mapBooksToShelves(books),
        shelvesAvailable: booksUtils.getListOfShelves(books)
      });
    })
  }


  render() {

    const { shelves, shelvesAvailable } = this.state;
    const bookShelves = Object.keys(shelves).map((shelf, index) => (
      <BookShelf key={ shelf } shelvesAvailable={ shelvesAvailable } {...shelves[shelf] } />
    ));

    return (
      <div className="app">

        {/* ROUTE: Home Page */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header title="MyReads" />

            <div className="list-books-content">
              { bookShelves }
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
