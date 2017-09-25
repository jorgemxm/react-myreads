import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import formSerialize from 'form-serialize';
import * as BooksAPI from '../../utils/BooksAPI';

// Import Custom Components
import BookLayoutGrid from './BookLayoutGrid';

// Import Data
import searchTerms from '../../data/searchTerms';


//-----------------------------------
// NOTE: Controlled Components - Udacity:React-NanoDegree - Lesson 03, Chapter 07
// - https://facebook.github.io/react/docs/forms.html#controlled-components
//-----------------------------------
export default class Search extends Component {

  static propTypes = {}

  state = {
    query: '',
    currentSearchTerm: '',
    maxResults: 20,
    autocompleteSuggestions: [],
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
  selectAutocompleteSuggestion = (evt, query) => {
    const keyCode = evt.keyCode || evt.which;

    // If the pressed key is the 'Enter' Key, Update the 'query' term
    if (keyCode === '13') {
      this.updateQuery(query);
    }
  }


  /**
  * Update List of Autocomplete Suggestions
  */
  handleAutocomplete = (query, searchTerms) => {

    // Filter Autocomplete Suggestions
    const autocompleteSuggestions = searchTerms.filter(term => (
      (term.toLowerCase().indexOf(query.toLowerCase()) >= 0)
    ));

    // Update Autocomplete
    this.setState({ autocompleteSuggestions });
  }


  /**
  * Search Submit
  * @param {Object} evt - form submit event
  */
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { query } = formSerialize(evt.target, { hash: true });

    BooksAPI.search(query, this.state.maxResults)
    .then(response => (
      this.setState({
        currentSearchTerm: query,    // Save current Search Term
        searchResults: response,     // Update Results Items
        autocompleteSuggestions: []  // Reset Autocomplete
      })
    ))
  }


  /**
  * Clear Current Search
  */
  handleResetSearch = (evt) => {
    this.setState({
      query: '',
      currentSearchTerm: '',
      searchResults: []
    });

    // TODO: Move the Focus to the InputField after reseting the Form
  }


  render() {
    const {
      query,
      currentSearchTerm,
      autocompleteSuggestions,
      searchResults
    } = this.state;

    // It shows a Message with the current search / option to clear the search
    const showCurrentSearch = (currentSearchTerm)
      ? (
        <div className="search-results-clear">
          Showing results for <strong>{ currentSearchTerm }.</strong>
          <a onClick={ this.handleResetSearch }>Clear Search</a>
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
                        onKeyDown={ (evt) => this.selectAutocompleteSuggestion(evt, searchTerm) }
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

          <ol className="books-grid">
            {
              (searchResults.length > 0) && (
                <BookLayoutGrid
                  { ...this.props }
                  books={ searchResults }
                />
              )
            }
          </ol>
        </div>
      </div>
    )
  }

}
