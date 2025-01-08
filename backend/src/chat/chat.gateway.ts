import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtAccessGuard } from "src/auth/guard/jwt-access.guard";
import { corsOptions } from "src/util/cors";
import { SocketWithUser } from "src/util/type";

@WebSocketGateway(corsOptions)
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
    this.server.emit("receive_message", {
      sender: "System",
      text: `${client.id} joined`,
      date: new Date(),
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.server.emit("users", Array.from(this.users));
    this.server.emit("receive_message", {
      sender: "System",
      text: `${client.id} left`,
      date: new Date(),
    });
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

  @SubscribeMessage("send_message")
  send_message(client: Socket, text: string) {
    this.server.emit("receive_message", {
      sender: client.id,
      text,
      date: new Date(),
    });
  }

  @UseGuards(JwtAccessGuard)
  @SubscribeMessage("auth_check")
  send_message_auth(client: SocketWithUser) {
    this.server.emit("receive_message", {
      sender: "System",
      text: `${client.id} authorized as ${client.user.name}`,
      date: new Date(),
    });
  }
}
