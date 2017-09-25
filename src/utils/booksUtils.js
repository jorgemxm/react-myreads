import { camelCaseToTitleCase } from './utils';

/**
* It Maps the books response from the API using a custom data structure
* @param {Array} apiBooksResponse
* ---
* @return {Object}
*/
export function mapBooksToShelves(apiBooksResponse) {
  const booksShelves = apiBooksResponse.reduce((last, book) => {
    last[book.shelf] = last[book.shelf] || {};
    last[book.shelf].shelfTitle = last[book.shelf].shelfTitle || camelCaseToTitleCase(book.shelf);
    last[book.shelf].books = last[book.shelf].books || [];

    // last[book.shelf].books.push(book);
    last[book.shelf].books = last[book.shelf].books.concat(book);
    return last;
  }, {});

  return booksShelves;
}


/**
* Move the given book to the given shelf name
* @param {Object} book
* @param {String} newShelf
* @param {Array} allBooks
* ---
* @return {Object}
*/
export function moveToShelf(book, newShelf, allBooks) {

  const newBooks = { ...allBooks };
  const bookIndex = newBooks[book.shelf].books.findIndex(_book => _book.id === book.id);

  // If the new shelf didn't have any books (It was empty) on page load
  newBooks[newShelf] = newBooks[newShelf] || { shelfTitle: camelCaseToTitleCase(newShelf) };
  newBooks[newShelf].books = newBooks[newShelf].books || [];

  // Add the book to the new shelf
  newBooks[newShelf].books = newBooks[newShelf].books.concat({
    ...allBooks[book.shelf].books[bookIndex],
    shelf: newShelf
  });

  // Remove the book from the previous shelf
  newBooks[book.shelf].books = [
    ...newBooks[book.shelf].books.slice(0, bookIndex),
    ...newBooks[book.shelf].books.slice(bookIndex + 1)
  ]

  return newBooks;
}


/**
* Remove the given book from the active Shelves
* @param {Object} book
* @param {Array} allBooks
* ---
* @return {Object}
*/
export function removeFromShelf(book, allBooks) {
  const newBooks = { ...allBooks };
  const bookIndex = newBooks[book.shelf].books.findIndex(_book => _book.id === book.id);

  newBooks[book.shelf].books = [
    ...newBooks[book.shelf].books.slice(0, bookIndex),
    ...newBooks[book.shelf].books.slice(bookIndex + 1)
  ]

  return newBooks;
}


/**
* It Creates a List with all the Book-Shelves available
* @param {Array} apiBooksResponse
* ---
* @return {Array}
*/
/*
export function getListOfActiveShelves(apiBooksResponse) {
  const shelves = apiBooksResponse.reduce((last, book, currentIndex, collection) => {

    // Avoid duplicated items in the List
    // NOTE: Maybe Use JS-Symbols instead of Arrays? (review browser support)
    if (last.indexOf(book.shelf) < 0) {
      last.push(book.shelf);
    }

    // Sort the list in Alphabetical order
    if (currentIndex + 1 === collection.length) {
      last.sort();
    }

    return last;
  }, []);

  return shelves;
}
*/
