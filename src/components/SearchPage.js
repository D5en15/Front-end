import React, { useState } from 'react';
import { getMovieSearch } from '../services/MovieService';

const SearchPage = ({ setMovies, setNumberOfMovies }) => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // ป้องกัน default behavior ของ form submission
  
    // Check if the search text is empty
    if (!searchText.trim()) {
      setErrorMessage('Please enter a movie title for search.');
      return;
    }
  
    try {
      const response = await getMovieSearch(searchText);
      if (response.statusCode === 200) {
        setMovies(response.data);
        setNumberOfMovies(response.data.length);
        setErrorMessage('');
      } else {
        setMovies([]);
        setNumberOfMovies(0);
        setErrorMessage(response.message || 'No movie found');
      }
    } catch (error) {
      console.error('Error searching movie:', error);
      setMovies([]);
      setNumberOfMovies(0);
      setErrorMessage('Error searching movie');
    }
  };

  return (
    <div>
      <h2>Movie Search</h2>
      <form className="d-flex">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter movie title"
          className="form-control mr-2" // Bootstrap class for margin-right
        />
        <button
          onClick={handleSearch}
          className="btn"
          style={{ backgroundColor: '#E493B3'}}
        >
          Search
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SearchPage;
