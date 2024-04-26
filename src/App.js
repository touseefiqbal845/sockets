// import "./App.css";
// import { useEffect, useState } from "react";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SigninPage from "./components/login";
// import SignupPage from "./components/signup";
// import MessagingPage from "./components/whatsapp";

// import io from "socket.io-client";



// function App() {
//   const socket = io.connect("http://localhost:3005");

//   //Room State
//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);
//   return (
//     <div className="App">
//       {/* <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<SignupPage />} />
//           <Route path="/login" element={<SigninPage />} />
//           <Route path="/chat" element={<MessagingPage />} />


//         </Routes>
//       </BrowserRouter> */}
//       <div className="App">
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send Message</button>
//       <h1> Message:</h1>
//       {messageReceived}
//     </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3005");
    const socket = io('http://localhost:3005', {
      transports: ['websocket']
   });
    setSocket(socket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect_error", (err) => {
        console.log(err.message);
        console.log(err.description);
        console.log(err.context);
      })
    }
  }, [socket]);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
