import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true }) // Enable CORS for testing
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private users = new Set<string>();

  afterInit(_server: Server) {
    console.log("WebSocket Initialized");
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.server.emit("users", Array.from(this.users));
  }

  @SubscribeMessage("sendMessage")
  handleMessage(_client: Socket, message: { sender: string; text: string }) {
    this.server.emit("receiveMessage", message); // Broadcast message to all clients
  }

  @SubscribeMessage("join")
  handleJoin(_client: Socket, username: string) {
    this.users.add(username);
    this.server.emit("users", Array.from(this.users));
  }
}
