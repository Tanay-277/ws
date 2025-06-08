import { SocketProvider } from "./context/SocketContext";
import ChatContainer from "./components/blocks/ChatContainer";

const App = () => {
	return (
		<SocketProvider>
			<div className="container p-4 h-screen flex flex-col bg-black overflow-hidden">
				<nav className="flex items-center justify-between w-full">
					<h1 className="font-semibold text-5xl md:text-7xl mb-4">Sockets</h1>
				</nav>

				<ChatContainer />
			</div>
		</SocketProvider>
	);
};

export default App;
