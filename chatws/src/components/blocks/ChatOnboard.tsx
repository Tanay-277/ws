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
import { useRef } from "react";

const ChatOnboard = () => {
	const roomCodeRef = useRef<HTMLInputElement>(null);

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

	return (
		<Card className="max-w-md">
			<CardHeader className="">
				<CardTitle className="text">Socket On</CardTitle>
				<CardDescription>Create a Socket room or join one</CardDescription>
			</CardHeader>
			<CardContent>
				<Label htmlFor="name" className="mb-2">
					Name
				</Label>
				<Input id="name" type="text" required />
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
						<Input id="name" type="text" required />
						<Button className="mt-3 w-full !rounded-md">Create Socket</Button>
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
						<Button className="mt-3 w-full !rounded-md">Join Socket</Button>
					</TabsContent>
				</Tabs>
			</CardFooter>
		</Card>
	);
};

export default ChatOnboard;
