import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { NOW_PLAYING_MOVIES, options } from "../utils/constant";
import {useDispatch} from "react-redux";

const useNowPlayingMovies = async()=>{
    const dispatch = useDispatch();
    try{
      const res = await axios.get(NOW_PLAYING_MOVIES,options);
      dispatch(getNowPlayingMovies(res.data.results));
    } catch(error){
      console.log(error);
    }
}
export default useNowPlayingMovies;