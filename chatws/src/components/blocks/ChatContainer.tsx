import { useCallback } from "react";
import ChatWindow from "./ChatWindow";
import RoomSidebar from "./RoomSidebar";
import { useSocket } from "../../context/SocketContext";

const ChatContainer = () => {
  const { isConnected } = useSocket();

  const handleManageUsers = useCallback(() => {
    // Implement user management functionality
    console.log("User management functionality to be implemented");
  }, []);

  const handleDeleteRoom = useCallback(() => {
    // Implement room deletion functionality
    console.log("Room deletion functionality to be implemented");
  }, []);

  return (
    <main className="bg-background rounded-lg flex-1 border flex flex-col md:flex-row overflow-hidden font-medium">
      {/* Status indicator for socket connection */}
      {!isConnected && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
          Disconnected
        </div>
      )}

      {/* Left Chat Window */}
      <ChatWindow />

      {/* Room Sidebar */}
      <RoomSidebar 
        onManageUsers={handleManageUsers}
        onDeleteRoom={handleDeleteRoom}
      />
    </main>
  );
};

export default ChatContainer;
