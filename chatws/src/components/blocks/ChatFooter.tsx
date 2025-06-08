import { useRef, memo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatFooterProps {
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
}

const ChatFooter = memo<ChatFooterProps>(
  ({ message, setMessage, onSend }) => {
    const submitRef = useRef<HTMLButtonElement>(null);

    return (
      <footer className="w-full bg-accent/50 p-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="rounded-full !bg-background border-none h-11 px-4"
            aria-label="Message input"
            onKeyDown={(e) => {
              if (e.key === "Enter") submitRef.current?.click();
            }}
          />
          <Button onClick={onSend} size="lg" ref={submitRef}>
            Send
          </Button>
        </div>
      </footer>
    );
  }
);

ChatFooter.displayName = "ChatFooter";

export default ChatFooter;
