import { useCallback, useEffect, useRef, useState } from "react";
import Bubble from "./Bubble";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { useSocket } from "../../context/SocketContext";

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useSocket();

  const handleSend = useCallback(() => {
    if (message.trim()) {
      // Send message through WebSocket
      sendMessage(message.trim());
      
      // Clear input
      setMessage("");
    }
  }, [message, sendMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = useCallback(() => {
    // Implement search functionality
    console.log("Search functionality to be implemented");
  }, []);

  const handleShare = useCallback(() => {
    // Implement share functionality
    console.log("Share functionality to be implemented");
  }, []);

  return (
    <div className="window w-full md:w-[75%] flex flex-col flex-1 min-h-0">
      <ChatHeader onSearch={handleSearch} onShare={handleShare} />

      {/* Chat area */}
      <div
        ref={chatRef}
        className="chat flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.length === 0 && (
          <p className="text-muted-foreground text-center">
            No messages yet
          </p>
        )}
        {messages.map((msg, idx) => (
          <Bubble
            key={idx}
            text={msg.text}
            timestamp={msg.timestamp}
            isUser={msg.isUser}
            userName={msg.userName}
          />
        ))}
      </div>

      <ChatFooter
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;
