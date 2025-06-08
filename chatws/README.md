# WebSocket Chat Application

A real-time chat application built with React, TypeScript, WebSocket, and Vite.

## Project Structure

The project is organized into two main parts:

1. **Frontend (src folder)**:
   - Components are separated into logical blocks
   - UI components are in the ui folder
   - WebSocket communication is handled through a context provider
   - Styling is done with Tailwind CSS

2. **Backend (api folder)**:
   - WebSocket server for real-time communication
   - User management and message broadcasting

## Features

- Real-time messaging
- User presence indicators
- Message history
- Clean UI with responsive design

## Development Setup

### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend

```bash
# Go to the api folder
cd api

# Install dependencies
npm install

# Run the WebSocket server
npm run dev
```

## Folder Structure

```
chatws/
├── src/
│   ├── components/
│   │   ├── blocks/ - Logical component blocks
│   │   │   ├── Bubble.tsx - Message bubble component
│   │   │   ├── ChatContainer.tsx - Main container for chat
│   │   │   ├── ChatFooter.tsx - Footer with message input
│   │   │   ├── ChatHeader.tsx - Header with actions
│   │   │   ├── ChatWindow.tsx - Main chat window
│   │   │   ├── RoomSidebar.tsx - Sidebar for room info
│   │   │   └── SectionHeader.tsx - Shared header component
│   │   └── ui/ - UI components
│   ├── context/
│   │   └── SocketContext.tsx - WebSocket context provider
│   ├── actions/
│   │   └── socket.ts - WebSocket utility functions
│   └── types/
│       └── index.ts - Type definitions
├── api/
│   └── src/
│       ├── index.ts - API entry point
│       └── server.ts - WebSocket server implementation
```

## Production Build

```bash
# Build the frontend
npm run build

# Build the backend
cd api
npm run build
```

## Technologies Used

- React
- TypeScript
- Vite
- WebSocket (ws)
- TailwindCSS
- Lucide Icons
  },
})
```
