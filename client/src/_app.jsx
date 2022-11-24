import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2314");

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("emiter", (data) => {
      console.log(data);
    });
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault()
    socket.emit('message', {
      text: message,
      name: localStorage.getItem('userName'),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessage('');
  }

  return <div>
    <form onSubmit={formSubmitHandler}>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default App;
