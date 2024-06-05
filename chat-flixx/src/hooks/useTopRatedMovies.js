import axios from "axios";
import { getTopRatedMovies } from "../redux/movieSlice";
import { TOP_RATED_MOVIES, options } from "../utils/constant";
import {useDispatch} from "react-redux";

const useTopRatedMovies = async() => {
    const dispatch = useDispatch();
    try{
      const res = await axios.get(TOP_RATED_MOVIES, options);
      dispatch(getTopRatedMovies(res.data.results));
    } catch(error){
      console.log(error);
    }
}
export default useTopRatedMovies;