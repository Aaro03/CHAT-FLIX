import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
  const user = useSelector((store)=>store.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = useSelector((store)=>store.movie.toggle);
  

  const logoutHandler = async () => {
    try{
      const res = await axios.get(`${API_END_POINT}/logout`);
      if(res.data.success){
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }

  const toggleHandler = () => {
    dispatch(setToggle());
  }

  const chatHandler = () => {
    navigate('/chat');
  }

  return (
    <div className='absolute z-10 bg-black flex w-[100%] items-center justify-between'>
      <img className="w-28" alt="" src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"/>
      {
        user && (
          <div className='flex items-center'>
            <button onClick={chatHandler} className='text-white mr-2 font-bold'>CHAT-FLIX</button>
            <div className='ml-4'>
                <button onClick={toggleHandler} className='bg-red-800 text-white px-3 py-2 text-xs'>{toggle?"Home":"Search"}</button>
                <button onClick={logoutHandler} className='bg-red-800 text-white px-3 py-2 ml-2 mr-2 text-xs'>LogOut</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Header;
