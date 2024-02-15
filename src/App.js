import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { DisplayBoard } from './components/DisplayBoard'
//----------------
import { Movies } from './components/Movies'
import CreateMovie from './components/CreateMovie'
import { getAllMovies, createMovie } from './services/MovieService'

//เพิ่มใหม่
import SearchPage from './components/SearchPage';


function App() {

  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState(0)

  //--------------
  const [movie, setMovie] = useState({})
  const [movies, setMovies] = useState([])
  const [numberOfMovies, setNumberOfMovies] = useState(0)
  const [searchResults, setSearchResults] = useState([]);


const movieCreate = (e) => {

  createMovie(movie)
    .then(response => {
      console.log(response);
      setNumberOfMovies(numberOfMovies+1)
  });
}


const fetchAllMovies = () => {
  getAllMovies()
    .then(movies => {
      console.log(movies)
      setMovies(movies);
      setNumberOfMovies(movies.length)
      setSearchResults([]);
    });
}

useEffect(() => {

    getAllMovies()
    .then(movies => {
      console.log(movies)
      setMovies(movies);
      setNumberOfMovies(movies.length)
    });

}, [])

  const onChangeForm = (e) => {
    if (e.target.name === 'title') {
        movie.title = e.target.value;
    } else if (e.target.name === 'genre') {
        movie.genre = e.target.value;
    } else if (e.target.name === 'director') {
        movie.director = e.target.value;
    } else if (e.target.name === 'release_year') {
        movie.release_year = e.target.value;
    }
    setMovie(movie)
}

   return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
            <CreateMovie
              Movies={Movies}
              onChangeForm={onChangeForm}
              createMovie={movieCreate}
            >
            </CreateMovie>
            <div className="col-md-8">
            <SearchPage
              setMovies={setMovies}
              setNumberOfMovies={setNumberOfMovies}
              setSearchResults={setSearchResults}
            />
            </div>
          </div>
          <div className="col-md-4">
                  <DisplayBoard
                    numberOfMovies={numberOfMovies}
                    getAllMovies={fetchAllMovies}
                  >
                  </DisplayBoard> 
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">
        <Movies movies={searchResults.length > 0 ? searchResults : movies}></Movies>
      </div>   
    </div>
  );
}

export default App;

 