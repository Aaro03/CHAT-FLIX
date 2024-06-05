import axios from "axios";
import { getPopularMovies } from "../redux/movieSlice";
import { POPULAR_MOVIES, options } from "../utils/constant";
import {useDispatch} from "react-redux";

const usePopularMovies = async() => {
    const dispatch = useDispatch();
    try{
      const res = await axios.get(POPULAR_MOVIES, options);
      dispatch(getPopularMovies(res.data.results));
    } catch(error){
      console.log(error);
    }
}
export default usePopularMovies;