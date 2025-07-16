import { useCallback } from "react";
import ChatWindow from "./ChatWindow";
import RoomSidebar from "./RoomSidebar";
import { useSocket } from "../../context/SocketContext";
import { AnimatePresence, motion } from "motion/react";

const ChatContainer = ({ onboard }: { onboard: boolean }) => {
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
		<AnimatePresence>
			{onboard && (
				<motion.main
					className="bg-background rounded-lg flex-1 border flex flex-col md:flex-row overflow-hidden font-medium"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1, ease: "circInOut", delay: 1.2 }}
				>
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
				</motion.main>
			)}
		</AnimatePresence>
	);
};

export default ChatContainer;
