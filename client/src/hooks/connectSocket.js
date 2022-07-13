import { createContext, useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext()

function connectSocket() {
  const socket = io.connect("https://api-waruta.herokuapp.com/")
  return socket
}

export { connectSocket }
