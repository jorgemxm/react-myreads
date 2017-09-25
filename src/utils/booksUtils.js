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
* It Creates a List with all the Book-Shelves available
* @param {Array} apiBooksResponse
* ---
* @return {Array}
*/
export function getListOfShelves(apiBooksResponse) {
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
