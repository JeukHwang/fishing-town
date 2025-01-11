import { Logger, UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtAccessGuard } from "src/auth/guard/jwt-access.guard";
import { toUserProfile, UserProfile } from "src/user/user.service";
import { corsOptions } from "src/util/cors";
import { SocketWithUser } from "src/util/type";

interface Message {
  sender: UserProfile;
  text: string;
  date: Date;
}

const systemProfile: UserProfile = {
  id: "System",
  name: "System",
  email: "System",
};

@WebSocketGateway(corsOptions)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger("ChatGateway");

  @WebSocketServer()
  server!: Server;

  private users: Record<string, UserProfile> = {};

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Connect: ${client.id}`);
  }

  @UseGuards(JwtAccessGuard)
  @SubscribeMessage("auth")
  auth(@ConnectedSocket() client: SocketWithUser) {
    this.users[client.id] = toUserProfile(client.user); // TODO: maybe need to save only id and fetch user info when needed
    this.server.emit("receive_message", {
      sender: systemProfile,
      text: `${client.user.name} connected`,
      date: new Date(),
    } as Message);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Disconnect: ${client.id}`);
    this.server.emit("receive_message", {
      sender: systemProfile,
      text: `${this.users[client.id]?.name ?? "Anonymous"} disconnected`,
      date: new Date(),
    } as Message);
    delete this.users[client.id];
  }

  @UseGuards(JwtAccessGuard)
  @SubscribeMessage("send_message")
  send_message(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() text: string
  ) {
    this.server.emit("receive_message", {
      sender: toUserProfile(client.user),
      text,
      date: new Date(),
    } as Message);
  }
}
