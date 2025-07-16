import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSocket } from "@/context/SocketContext";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

const ChatOnboard = ({
	onboard,
	setOnboard,
	setRoomCode,
}: {
	onboard: boolean;
	setOnboard: React.Dispatch<React.SetStateAction<boolean>>;
	setRoomCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const roomCodeRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState<string>("");
	const [roomName, setRoomName] = useState<string>("");

	const { socket, sendMessage } = useSocket();

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (roomCodeRef.current) {
				roomCodeRef.current.value = text;
			}
		} catch (error) {
			console.error("Failed to read clipboard contents: ", error);
		}
	};

	const handleRoomCreate = () => {
		console.log("sending");

		if (!socket) {
			toast("Error Connecting Server!");
			console.log(socket);
			return null;
		}
		if (socket.readyState === WebSocket.OPEN) {
			const message = {
				type: "create",
				payload: {
					user: {
						name,
						roomName,
					},
					message: `${name} wants to create a room(${roomName})`,
				},
			};
			console.log(message);

			socket.send(JSON.stringify(message));
		}
		setOnboard(true);
	};

	return (
		<AnimatePresence>
			{/* <Toaster /> */}
			{!onboard && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1, ease: "circInOut" }}
				>
					<Card className="max-w-md">
						<CardHeader className="">
							<CardTitle className="text">Socket On</CardTitle>
							<CardDescription>
								Create a Socket room or join one
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Label htmlFor="name" className="mb-2">
								Name
							</Label>
							<Input
								id="name"
								type="text"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<p className="text-sm text-gray-400 mt-1">
								Enter your public display name
							</p>
						</CardContent>
						<CardFooter>
							<Tabs defaultValue="join" className="w-full">
								<TabsList className="w-full mb-2">
									<TabsTrigger value="create">Create Room</TabsTrigger>
									<TabsTrigger value="join">Join Room</TabsTrigger>
								</TabsList>
								<TabsContent value="create">
									<Label htmlFor="name" className="mb-2">
										Room Name
									</Label>
									<Input
										id="name"
										type="text"
										required
										value={roomName}
										onChange={(e) => setRoomName(e.target.value)}
									/>
									<Button
										className="mt-3 w-full !rounded-md"
										onClick={handleRoomCreate}
									>
										Create Socket
									</Button>
								</TabsContent>
								<TabsContent value="join">
									<Label htmlFor="name" className="mb-2">
										Socket Code
									</Label>
									<div className="flex gap-1">
										<Input id="name" type="text" required ref={roomCodeRef} />
										<Button
											className="!rounded-md"
											variant={"secondary"}
											onClick={handlePaste}
										>
											Paste
										</Button>
									</div>
									<Button className="mt-3 w-full !rounded-md">
										Join Socket
									</Button>
								</TabsContent>
							</Tabs>
						</CardFooter>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChatOnboard;
