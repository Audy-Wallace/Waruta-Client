import {io} from "socket.io-client"
function connectSocket() {
  const socket = io.connect('http://localhost:3000/');
  return socket
}

export {connectSocket}