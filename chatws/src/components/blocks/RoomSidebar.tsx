import { BookUser, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { memo } from "react";
import { SectionHeader } from "./SectionHeader";

interface RoomSidebarProps {
  onManageUsers?: () => void;
  onDeleteRoom?: () => void;
}

const RoomSidebar = memo<RoomSidebarProps>(({ onManageUsers, onDeleteRoom }) => {
  return (
    <div className="room border-t md:border-t-0 md:border-l border-dashed w-full md:w-[25%] flex flex-col">
      <SectionHeader title="Room">
        <Button 
          size="lg" 
          variant="secondary" 
          aria-label="Manage users"
          onClick={onManageUsers}
        >
          <BookUser className="size-4 mr-2" /> Manage Users
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="!aspect-square"
          aria-label="Delete room"
          onClick={onDeleteRoom}
        >
          <Trash className="size-4" />
        </Button>
      </SectionHeader>

      <div className="room-content p-4 flex-1 overflow-y-auto">
        <p className="text-muted-foreground">No users connected</p>
      </div>
    </div>
  );
});

RoomSidebar.displayName = "RoomSidebar";

export default RoomSidebar;
