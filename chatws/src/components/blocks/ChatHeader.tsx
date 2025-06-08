import { Search, Share } from "lucide-react";
import { Button } from "../ui/button";
import { memo } from "react";
import { SectionHeader } from "./SectionHeader";

interface ChatHeaderProps {
	onSearch?: () => void;
	onShare?: () => void;
}

const ChatHeader = memo<ChatHeaderProps>(({ onSearch, onShare }) => {
	return (
		<SectionHeader title="Chat">
			<Button
				size="lg"
				variant="secondary"
				aria-label="Search messages"
				onClick={onSearch}
			>
				<Search className="size-4 mr-2" /> Search
			</Button>
			<Button
				size="lg"
				variant="secondary"
				aria-label="Share chat"
				onClick={onShare}
			>
				<Share className="size-4" />
			</Button>
		</SectionHeader>
	);
});

ChatHeader.displayName = "ChatHeader";

export default ChatHeader;
