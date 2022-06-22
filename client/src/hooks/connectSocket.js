import { createContext, useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext()

function connectSocket() {
  const socket = io.connect("http://localhost:3000/")
  return socket
}

export { connectSocket }
