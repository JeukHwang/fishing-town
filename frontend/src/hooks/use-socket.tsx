import { Message } from "@/lib/shared";
import { domain } from "@/lib/utils";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // const newSocket = io(domain, { query: { room } });
    const newSocket = io(domain, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => void newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", ({ sender, text, date }: Message) => {
      const converted: Message = { sender, text, date: new Date(date) };
      setMessages((prevMessages) => [...prevMessages, converted]);
    });
    socket.emit("auth");
  }, [socket]);

  const sendMessage = (message: string) => {
    if (!socket) return;
    socket.emit("send_message", message);
  };

  return { socket, messages, sendMessage };
};

export default useSocket;
