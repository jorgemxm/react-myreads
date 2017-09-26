import React from 'react';

function NoResults(props) {
  return (
    <div className='no-results'>
      <h2>No results were found :(</h2>
      <hr/>

      <h3>Search tips:</h3>
      <ul>
        <li>Try alternate spelling for your search terms</li>
        <li>Use different search terms</li>
        <li>Try selecting one of the suggested terms</li>
      </ul>


      <div className="no-results-disclaimer">

        {/*
        <hr/>
        <p><strong>NOTE:</strong> The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here: <a
            href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
            aria-label="View Search Terms Available"
            // NOTE: Using target="_blank" without rel="noopener noreferrer" is a security risk:
            // see https://mathiasbynens.github.io/rel-noopener
            target="_blank"
            rel="noopener noreferrer"
          >SEARCH_TERMS.md</a>
        </p>
        */ }

        { /*
        <p>However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.</p>
        */ }

      </div>

    </div>
  )
}

NoResults.propTypes = { };

export default NoResults;
