import React, { useEffect, useState } from "react";

import "../css/app.css";
import Movie from "./movieApp";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=74207837693808ec992c37ac2edfd112&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=74207837693808ec992c37ac2edfd112&query=";

function App() {
  const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getMovies(FEATURED_API);
    }, []);
    const getMovies = (API)=>{
        fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
            });
        }
    const HandleOnSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm("");

        }  
    }
    const HandleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }
  return (
    <React.Fragment>
          <header>
              <h1>Movie<span>App</span></h1>
              <form onSubmit={HandleOnSubmit}>
                  <input className="search" type="text" placeholder="Search...."
                      value={searchTerm}
                      onChange={HandleOnChange}
                  ></input>
              </form>
      </header>
      <div className="movieContainer">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      ;
    </React.Fragment>
  );
}

export default App;
