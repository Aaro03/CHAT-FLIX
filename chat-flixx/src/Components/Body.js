import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './Browse';
import Loginto from './Loginto';
import Chatbot from './Chatbot';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:'/',
            element: <Loginto/>
        },
        {
            path:'/browse',
            element: <Browse/>
        },
        {
            path:'/chat',
            element: <Chatbot/>
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;
