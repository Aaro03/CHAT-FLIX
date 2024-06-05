import React from 'react';
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import {useSelector} from "react-redux";

const MainContain = () => {
  const movie = useSelector((store)=>store.movie?.nowPlayingMovies);
  if(!movie) return;
  const {overview, id, title} = movie[6];
  return (
    <div className='bg-black'>
      <VideoTitle title={title} overview={overview}/>
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContain;
