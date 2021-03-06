import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import * as booksUtils from './utils/booksUtils';
import { camelCaseToTitleCase } from './utils/helpers';
import './assets/css/App.css';

// Import Custom Components
import { Header } from './components/common';
import { BookShelf, Search } from './components/books';

// Main Container Component
class BooksApp extends Component {
  state = {
    shelves: { },
    shelvesAvailable: [
      'currentlyReading',
      'wantToRead',
      'read'
    ]
  }


  componentDidMount() {
    this.loadData();
  }


  loadData() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({
        shelves: booksUtils.mapBooksToShelves(books)
      });
    });
  }


  /**
  * It Moves the given book from one shelf to another / remove it from the shelves
  * @param {Object} book
  * @param {String} newShelf
  */
  onUpdateBookShelf = (book, newShelf) => {
    const updatedShelves = (newShelf === 'none')
      ? booksUtils.removeFromShelf(book, this.state.shelves)
      : booksUtils.moveToShelf(book, newShelf, this.state.shelves);

    BooksAPI.update(book, newShelf)
    .then(response => {
      this.setState(state => ({ shelves: updatedShelves }));
    });
  }


  findBookShelf = (bookId) => {
    return booksUtils.findBookShelf(bookId, this.state.shelves);
  }


  render() {

    const { shelves, shelvesAvailable } = this.state;
    const bookShelves = shelvesAvailable.map((shelf, index) => (
        <BookShelf
          key={ shelf }
          shelvesAvailable={ shelvesAvailable }
          shelfTitle={ camelCaseToTitleCase(shelf) }
          onUpdateBookShelf={ this.onUpdateBookShelf }
          { ...shelves[shelf] }
        />
      )
    );

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
        {/* <Route path="/search" component={ Search } /> */}
        <Route path="/search" render={ () => (
          <Search
            shelvesAvailable={ shelvesAvailable }
            onUpdateBookShelf={ this.onUpdateBookShelf }
            findBookShelf={ this.findBookShelf }
          />
        ) } />

      </div>
    )
  }
}

export default BooksApp;
