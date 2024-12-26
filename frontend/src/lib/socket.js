import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
    if (!socket) {
        socket = io("http://localhost:5001", {
            query: {
                userId,
            },
        });

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () =>  socket;