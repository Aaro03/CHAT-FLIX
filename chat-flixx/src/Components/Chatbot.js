import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


const Chatbot = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you today?', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const userMessage = input;
            setMessages([...messages, { text: userMessage , sender: 'user' }]);
            setInput('');

        try{
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBWcmEDp8zzQadfVlf_JenjDPyFv8fcI8c',
                method: "post",
                data: {
                contents: [{ parts: [{ text: userMessage }] }],
                },
            });

            const botResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"] // Adjust based on the API response structure
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: botResponse, sender: 'bot' }
            ]);
          } catch (error) {
            console.error('Error fetching response from Gemini API:', error);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' }
            ]);
          }
        }
      };
    

    const homeHandler = () => {
        navigate("/browse");
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

    return (
        <div className="bg-black shadow-lg w-full h-screen flex-col flex mt-1"> 
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl text-red-800 font-semibold flex">CHAT-FLIX</h1>
            <button onClick={homeHandler} className="bg-red-800 text-white px-3 py-2 float-right">Home</button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end' : ''}`}
                    >
                    <div
                        className={`${
                        message.sender === 'user' ? 'bg-gray-200' : 'bg-red-800 text-white'
                        } rounded-lg p-3`}
                    >
                        {message.text}
                    </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="p-4 border-t border-gray-600">
            <form className="flex space-x-2" onSubmit={handleSend}>
            <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button type="submit" className="bg-red-800 text-white rounded-lg p-2">
                Send
            </button>
            </form>
        </div>
        </div>
    )
}

export default Chatbot;
