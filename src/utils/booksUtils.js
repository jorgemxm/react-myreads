/**
* It Maps the books response from the API using a custom data structure
* @param {Array} apiBooksResponse
* ---
* @return {Object}
*/
export function mapBooksToShelfs(apiBooksResponse) {
  const booksShelfs = apiBooksResponse.reduce((last, book) => {
    last[book.shelf] = last[book.shelf] || {};
    last[book.shelf].shelfTitle = last[book.shelf].shelfTitle || _camelCaseToTitleCase(book.shelf);
    last[book.shelf].books = last[book.shelf].books || [];

    // last[book.shelf].books.push(book);
    last[book.shelf].books = last[book.shelf].books.concat(book);
    return last;
  }, {});

  return booksShelfs;
}


/**
* Other Utility Functions
*/
function _camelCaseToTitleCase(text) {
  if (text.length > 0) {
    const result = text.replace( /([A-Z])/g, ' $1' );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
