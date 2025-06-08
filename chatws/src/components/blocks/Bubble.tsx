import React from "react";
import { Avatar } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface BubbleProps {
	message: string;
	timestamp?: string | Date;
	isUser?: boolean;
	avatar?: string;
	userName?: string;
	id?: string;
}

const Bubble = React.memo<BubbleProps>(
	({ message, timestamp, isUser = false, avatar, userName, id }) => {

		const formattedTime = React.useMemo(() => {
			if (!timestamp) return "";
			if (typeof timestamp === "string") return timestamp;
			return formatDistanceToNow(timestamp, { addSuffix: true });
		}, [timestamp]);

		const bubbleId =
			id || `message-${Math.random().toString(36).substring(2, 9)}`;

		return (
			<div
				className={`flex gap-3 mb-5 ${
					isUser ? "flex-row-reverse" : "flex-row"
				} items-end`}
				aria-labelledby={bubbleId}
				role="listitem"
			>
				<div className="av">
					{!isUser && (
						<Avatar className="h-10 w-10 shrink-0">
							{avatar ? (
								<img
									src={avatar}
									alt={userName || "User avatar"}
									className="h-full w-full object-cover rounded-full"
									loading="lazy"
								/>
							) : (
								<div className="bg-accent h-full w-full rounded-full flex items-center justify-center text-white font-medium">
									{userName?.[0]?.toUpperCase() || "U"}
								</div>
							)}
						</Avatar>
					)}
					{!isUser && userName && (
						<span className="text-xs font-medium text-gray-400 mb-1 ml-1">
							{userName}
						</span>
					)}
				</div>

				<div className="flex flex-col max-w-[70%]">
					<div
						id={bubbleId} 
						className={`rounded-full w-fit px-4 py-2.5 shadow-sm ${
							isUser ? "bg-cyan-200 text-black self-end" : "bg-neutral-800 text-gray-100"
						}`}
					>
						<p className="text-sm md:text-base whitespace-pre-wrap break-words">
							{message}
						</p>
					</div>

					{formattedTime && (
						<span
							className={`text-[10px] text-gray-500 mt-1 ${
								isUser ? "text-right mr-1" : "ml-1"
							}`}
						>
							{formattedTime}
						</span>
					)}
				</div>

				{/* {isUser && (
					<Avatar className="h-10 w-10 shrink-0">
						{avatar ? (
							<img
								src={avatar}
								alt="Your avatar"
								className="h-full w-full object-cover rounded-full"
								loading="lazy"
							/>
						) : (
							<div className="bg-blue-950 h-full w-full rounded-full flex items-center justify-center text-white font-medium">
								{userName?.[0]?.toUpperCase() || "Y"}
							</div>
						)}
					</Avatar>
				)} */}
			</div>
		);
	}
);

Bubble.displayName = "Bubble";

export default Bubble;
