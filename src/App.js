import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';



const App =() => {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);


  // generate an API request
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=532f958d`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };


  // retrieve the user serchvalue from the API
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);


  // save to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };
  

  // add selected movie to favourite array
  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const RemoveFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID ,);

      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  }


  // render the result
  return (
    <div className='container-fluid movie-app'>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies Listing' />
        <SearchBox searchValue={searchValue} 
          setSearchValue={setSearchValue} 
        />
      </div>

      <div className='row'>
        <MovieList 
          movies={movies}
          handleFavouritesClick={AddFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites" />
      </div>

      <div className='row'>
        <MovieList 
          movies={favourites}
          handleFavouritesClick={RemoveFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>

    </div>
  );
}

export default App;
