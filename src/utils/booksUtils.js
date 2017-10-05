import { camelCaseToTitleCase } from './helpers';

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

  // Validate if the Current Book has a Shelf assigned or Not
  const bookIndex = (book.shelf && book.shelf !== 'none')
    ? newBooks[book.shelf].books.findIndex(_book => _book.id === book.id)
    : -1;

  // Validate If the name of the "newShelf" provided was empty (If it didn't have any books on page load)
  newBooks[newShelf] = newBooks[newShelf] || { shelfTitle: camelCaseToTitleCase(newShelf) };
  newBooks[newShelf].books = newBooks[newShelf].books || [];

  // Add the Current Book to the given shelf name
  newBooks[newShelf].books = newBooks[newShelf].books.concat({
    ...book,
    shelf: newShelf
  });

  // If the book was found in the Active Shelves, Remove it from its previous shelf
  if (bookIndex >= 0) {
    newBooks[book.shelf].books = [
      ...newBooks[book.shelf].books.slice(0, bookIndex),
      ...newBooks[book.shelf].books.slice(bookIndex + 1)
    ];
  }

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
* Find a book by its id in all the book shelves,
* if found, return the name of the current Shelf
* @param {Object} book
* @param {Array} allBooks
* ---
* @return {String} - Current Book Shelf
*/
export function findBookShelf(bookId, allBooks) {
  const foundBook = Object.keys(allBooks).reduce((last, shelf) => {
    const found = ((allBooks[shelf].books.find(_book => _book.id === bookId)));

    if (found) { last = found.shelf; }
    return last;
  }, '');

  return (foundBook) ? foundBook : 'none';
}


/**
* It Creates a List with all the active Shelves that the current user has
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
