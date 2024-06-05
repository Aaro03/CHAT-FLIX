import React from 'react';
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setLoading, setUser } from '../redux/userSlice';

const Loginto = () => {
    const [isLogin,setLogin] = useState(false);
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector(store=>store.app.isLoading);

    const loginHandler = () => {
        setLogin(!isLogin);
    }

    const getInputData = async (e)=>{
        e.preventDefault();
        dispatch(setLoading(true));
        if(isLogin){
            const user  = {email,password};
            try{
                const res = await axios.post(`${API_END_POINT}/login`, user,{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
                if(res.data.success){
                    toast.success(res.data.message);
                }
                dispatch(setUser(user));
                navigate("/browse");
            } catch(error){
                toast.error(error.response.data.message);
                console.log(error);
            } finally{
                dispatch(setLoading(false));
            }
        }else{
            dispatch(setLoading(true));
            const user = {fullName,email,password};
            try{
                const res = await axios.post(`${API_END_POINT}/register`,user,{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
                if(res.data.success){
                    toast.success(res.data.message);
                }
                setLogin(true);
            } catch(error){
                toast.error(error.response.data.message);
                console.log(error);
            }finally{
                dispatch(setLoading(false));
            }
        }
        setFullName("");
        setEmail("");
        setPassword("");
    }


     
    return (
        <div>
            <Header/>
            <div className='w-full h-full'>
                <img className="absolute w-[100vw] h-[100vh]" src="https://www.pcworld.com/wp-content/uploads/2024/03/Netflix-Hintergrund-1.jpg?quality=50&strip=all" alt="banner"/>
            </div>
            <form onSubmit={getInputData} className='flex flex-col w-3/12 p-10 my-36 left-0 right-0 mx-auto items-center justify-center absolute bg-black opacity-85'>
                <h1 className='text-white mb-4 text-3xl font-bold pt-0.5'>{isLogin?'Login':'Signup'}</h1>
                <div className='flex flex-col'>
                    {
                        !isLogin && <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder='Full Name' className='outline-none p-3 my-2 bg-gray-800 text-white'/>

                    }
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' className='outline-none p-3 my-2 bg-gray-800 text-white'/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type='text' placeholder='Password' className='outline-none p-3 my-2 bg-gray-800 text-white'/>
                    <button className='font-bold bg-white p-2 mt-1 mb-1'>{`${isLoading ? "loading...":(isLogin?"Login":"Signup")}`}</button>
                    <p className='text-white'>{isLogin ? 'New to Chatflix?':'Already have an account?' }<span onClick={loginHandler} className='text-blue-400 ml-2 font-bold cursor-pointer'>{isLogin?'SignUp':'Login'}</span></p>
                </div>
            </form>
        </div>
    )
}

export default Loginto;
