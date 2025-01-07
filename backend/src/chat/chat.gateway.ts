import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({cors:{
    // Never use trailing slashes in the origin URL to prevent CORS issues
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173", // Frontend development server
        "https://fishing-town.jeuk.io", // Frontend production server
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    /** @see https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options */
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Allow default methods + OPTIONS for preflight
    credentials: true,
  }}) // Enable CORS for testing
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
  handleMessage(
    @ConnectedSocket() _client: Socket,
    @MessageBody() message: { sender: string; text: string }
  ) {
    this.server.emit("receiveMessage", message); // Broadcast message to all clients
  }

  @SubscribeMessage("join")
  handleJoin(_client: Socket, username: string) {
    this.users.add(username);
    this.server.emit("users", Array.from(this.users));
  }
}
