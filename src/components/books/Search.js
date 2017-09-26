import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formSerialize from 'form-serialize';
import excapeRegExp from 'escape-string-regexp';
import * as BooksAPI from '../../utils/BooksAPI';

// Import Custom Components
import BookLayoutGrid from './BookLayoutGrid';
import NoResults from './SearchNoResults';

// Import Data
import searchTerms from '../../data/searchTerms';


//-----------------------------------
// NOTE: Controlled Components - Udacity:React-NanoDegree - Lesson 03, Chapter 07
// - https://facebook.github.io/react/docs/forms.html#controlled-components
//-----------------------------------
export default class Search extends Component {

  static propTypes = {
    shelvesAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    currentSearchTerm: '',
    minCharsShowAutocomplete: 2,
    maxResults: 20,
    autocompleteSuggestions: [],
    statusNoResults: false,
    searchResults: [],
    searchTerms
  }


  /**
  * Update the value of the Search input field
  */
  updateQuery = (query) => {
    this.setState({ query });
    this.handleAutocomplete(query, this.state.searchTerms);
  }


  /**
  *
  */
  selectSuggestion = (evt, query) => {
    const keyCode = evt.keyCode || evt.which;

    // If Key-Pressed is 'Enter' Key
    if (keyCode === 13) {
      this.updateQuery(query);
    }
  }


  /**
  * Update List of Autocomplete Suggestions
  */
  handleAutocomplete = (query, searchTerms) => {

    let autocompleteSuggestions = [];
    let { minCharsShowAutocomplete } = this.state;

    // Show Autocomplete only if the current searchTerm has more than x amount of Characters
    if (query.length >= minCharsShowAutocomplete) {

      // Filter Autocomplete Suggestions
      autocompleteSuggestions = searchTerms.filter(term => (
        (term.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      ));
    }

    // Update Autocomplete
    this.setState({ autocompleteSuggestions });

  }


  /**
  * Search Submit / Handle input validation
  * @param {Object} evt - form submit event
  */
  handleSubmit = (evt) => {
    evt.preventDefault();
    let { query } = formSerialize(evt.target, { hash: true });

    // Validate if "query" is not empty
    query = (query && query.length > 0)
      ? excapeRegExp(query.trim())
      : false;

    // If not empty query, fetch search results
    if (query) {
      BooksAPI.search(query, this.state.maxResults)
      .then((response) => {
        this.updateSearchResults(query, response)
      });
    }

    // else the query had nothing but "space" charactes, reset the form
    else {
      this.resetSearch();
    }

  }


  /**
  * Clear Current Search
  */
  resetSearch = (evt) => {
    this.setState({
      query: '',
      currentSearchTerm: '',
      autocompleteSuggestions: [],
      statusNoResults: false,
      searchResults: []
    });

    // Moves the Focus to the InputField after reseting the Form
    this.inputSearch.focus();
  }


  /**
  * Update Search Results
  */
  updateSearchResults = (query, response) => {
    console.log(response);

    // Fetch Search was Empty
    if (response.hasOwnProperty('error')) {
      this.setState({
        currentSearchTerm: query,    // Save current Search Term
        statusNoResults: true,       // Show "NoResults" Message
        searchResults: []            // Remove previous Results items
      })
    }

    // Fetch Search has Results
    else {
      this.setState({
        currentSearchTerm: query,    // Save current Search Term
        statusNoResults: false,      // Hide "NoResults" Message
        searchResults: response,     // Update Results Items
        autocompleteSuggestions: []  // Reset Autocomplete
      })
    }
  }


  render() {
    const {
      query,
      currentSearchTerm,
      autocompleteSuggestions,
      statusNoResults,
      searchResults
    } = this.state;

    // It shows a Message with the current search / option to clear the search
    const showCurrentSearch = (currentSearchTerm)
      ? (
        <div className="search-results-clear">
          Showing results for <strong>{ currentSearchTerm }.</strong>
          <a onClick={ this.resetSearch }>Clear Search</a>
        </div>
      )
      : false;

    return (
      <div className="search-books">
        <form onSubmit={ this.handleSubmit } className="form-search-books" autoComplete="off">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTE: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

              <input
                name="query"
                type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ (evt) => this.updateQuery(evt.target.value) }
                autoFocus // Focus this field once the component is mounted

                // NOTE: Refs - https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element
                ref={ (input) => { this.inputSearch = input } }
              />


              {/* Render Autocomplete Suggestions */}
              { (autocompleteSuggestions.length > 0) && (
                <ul className='search-books-autocomplete'>
                  { autocompleteSuggestions.map(searchTerm => (
                    <li
                      key={ searchTerm }
                      className='search-books-autocomplete-item'
                    >
                      <button
                        className="search-books-autocomplete-link-item"
                        type="submit"
                        onClick={ () => this.updateQuery(searchTerm) }
                        onKeyDown={ (evt) => this.selectSuggestion(evt, searchTerm) }
                      >{ searchTerm }</button>
                    </li>
                  ))
                  }
                </ul>
              )}
            </div>
          </div>
        </form>

        <div className="search-books-results">

          { showCurrentSearch }

          { statusNoResults && (
            <NoResults />
          )}

          <ol className="books-grid">
            { (searchResults.length > 0) && (
              <BookLayoutGrid
                { ...this.props }
                books={ searchResults }
              />
            )}
          </ol>
        </div>
      </div>
    )
  }

}
