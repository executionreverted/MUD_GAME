import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { InMemoryGameState } from "./game/GameState";
import { commandRegistry } from "./CommandRegistry";
import dotenv from "dotenv";
import { databaseAdapter } from "./db/DatabaseAdapter";
dotenv.config();
databaseAdapter.initialize()

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const gameState = new InMemoryGameState();

io.on("connection", (socket: Socket) => {
  const playerId = gameState.addPlayer(socket.id);

  socket.emit("message", `Welcome, ${playerId}!`);
  socket.broadcast.emit("message", `${playerId} joined.`);

  socket.on("command", async (input: any) => {
    console.log(input);


    const lastRequestTime = gameState.getLastRequestTime(socket.id);

    if (Date.now() - lastRequestTime < 1000) {
      socket.emit("message", "Please wait before sending another command");
      gameState.setLastRequestTime(socket.id, Date.now());
      return;
    }

    gameState.setLastRequestTime(socket.id, Date.now());

    const [command, args] = input
    const handler = commandRegistry.getHandler(command.toLowerCase());

    if (!handler) {
      socket.emit("message", "Unknown command");
      return;
    }

    let result
    try {
      result = await handler(playerId, args);
    } catch (error) {
      socket.emit("message", "Invalid command or args");
      return;
    }

    // Apply state updates
    if (result.stateUpdates) {
      // Update player in db
    }

    // Broadcast or send response
    if (result.broadcast) {
      io.emit("message", [result.message, result?.payload || {}]);
    } else {
      socket.emit("message", [result.message, result?.payload || {}]);
    }
  });

  socket.on("disconnect", () => {
    gameState.removePlayer(socket.id);
    gameState.deleteLastRequestTime(socket.id);
    io.emit("message", `${playerId} left.`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT}`);
});