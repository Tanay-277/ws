import { SocketProvider, useSocket } from "./context/SocketContext";

import ChatOnboard from "./components/blocks/ChatOnboard";
import ChatContainer from "./components/blocks/ChatContainer";
import { useRef, useState } from "react";

const App = () => {
	const roomCodeRef = useRef<HTMLButtonElement>(null);
	const [isCopied, setIsCopied] = useState<Boolean>(false);
	const [onboard, setOnboard] = useState<boolean>(false);
	const [roomCode, setRoomCode] = useState<string>("&$+*=?");

	const handleCopy = () => {
		try {
			navigator.clipboard.writeText(roomCodeRef.current?.textContent || "");
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy room code: ", error);
		}
	};

	return (
		<SocketProvider>
			<div className="container p-4 h-screen flex flex-col bg-black overflow-hidden">
				<nav className="flex items-center justify-between w-full font-semibold text-5xl md:text-7xl mb-4">
					<h1>Sockets</h1>
					<div className="relative group">
						<button
							className="font-mono cursor-pointer text-5xl md:text-6xl font-bold text-muted-foreground flex items-center transition-all duration-200 ease-out tracking-tight"
							ref={roomCodeRef}
							onClick={handleCopy}
						>
							{roomCode}
						</button>
						<span
							className={` absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-gray-300 shadow-lg transition-all duration-200 ${
								isCopied
									? "opacity-100 scale-100"
									: "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
							}`}
						>
							{isCopied ? "Copied!" : "Copy"}
						</span>
					</div>
				</nav>
				<ChatOnboard
					onboard={onboard}
					setOnboard={setOnboard}
					setRoomCode={setRoomCode}
				/>
				<ChatContainer onboard={onboard} />
			</div>
		</SocketProvider>
	);
};

export default App;
