import React, { useEffect } from 'react';
import Header from './Header';
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import MainContain from './MainContain';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js';
import usePopularMovies from '../hooks/usePopularMovies.js';
import useTopRatedMovies from '../hooks/useTopRatedMovies.js';
import useUpcomingMovies from '../hooks/useUpcomingMovies.js';
import SearchMovie from './SearchMovie.js';


const Browse = () => {
  const user = useSelector((store)=>store.app.user)
  const navigate = useNavigate();
  const toggle = useSelector((store)=>store.movie.toggle)

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  
  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  })
  
  return (
    <div>
        <Header/>
        <div>
          {
            toggle? <SearchMovie/>: (
              <>
                <MainContain/>
                <MovieContainer/>
              </>
            )
          }
          
        </div>
    </div>
  )
}

export default Browse;
