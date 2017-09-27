/**
* Global Utility Functions
*/

export function camelCaseToTitleCase(text) {
  if (text.length > 0) {
    const result = text.replace( /([A-Z])/g, ' $1' );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
