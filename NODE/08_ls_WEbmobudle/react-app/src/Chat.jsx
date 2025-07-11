import {useEffect, useRef, useState} from "react";

const Chat = () => {
	
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const ws = useRef(null);
	const messageContainerRef = useRef(null);
	
	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:3001');
		ws.current.onopen = () => {
			console.log('Connected to server');
		}
		
		ws.current.onmessage = async (event) => {
			if (event.data instanceof Blob) {
				const text = await event.data.text();
				setMessages(messages => [...messages, text]);
			} else {
				setMessages(messages => [...messages, event.data]);
			}
		}
		
		ws.current.onclose = () => {
			console.log('Disconnected from server');
		}
		
		return () => {
			ws.current.close();
		}
	}, []);
	
	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
		}
	}, [messages])
	
	const sendMessage = () => {
		if (ws.current && input.trim() !== '') {
			ws.current.send(input);
			setMessages(messages => [...messages, input]);
			setInput('');
		}
	}
	
	return (
	  <div className='flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8'>
		  <h2 className='text-3xl font-bold text-gray-700 mb-6'>Real time chat</h2>
		  <div ref={messageContainerRef}
			   className='w-full max-w-md overflow-y-auto bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-300'
		  >
			  {messages.length === 0 ? (
				<div className='text-gray-400 text-center'>
					No messages yet
				</div>
			  ) : (
				messages.map((message, index) => (
				  <div key={index} className='flex items-center mb-2'>
					  <div className='flex justify-between items-center gap-2 flex-shrink-0 mr-2'>
						  <img className='w-8 h-8 rounded-full' src='https://i.pravatar.cc/100' alt='avatar'/>
						  {message}
					  </div>
				  </div>
				))
			  )}
		  </div>
		  <div className='w-full max-w-md flex items-center justify-center'>
			  <label>
				  <input
					onChange={e => setInput(e.target.value)}
					value={input}
					placeholder='Enter the message' type='text'
					className='flex-grow border border-gray-700 rounded-l-lg px-4 py-2'/></label>
			  <button onClick={sendMessage}
					  className='flex-shrink-0 px-4 py-2 border border-blue-500 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg'>Send
			  </button>
		  </div>
	  </div>
	);
};

export default Chat;