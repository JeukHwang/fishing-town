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

  private readonly data: Record<
    string, // User ID
    {
      cached: { userProfile: UserProfile };
      redis: { socketId: string };
      sql: { room: string };
    }
  > = {};

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Connect: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Disconnect: ${client.id}`);

    const found = Object.entries(this.data).find(
      ([_, value]) => value.redis.socketId === client.id
    );

    if (!found) return;
    const [_userId, data] = found;
    if (data.sql.room) {
      this.server.to(data.sql.room).emit("receive_message", {
        sender: systemProfile,
        text: `${data.cached.userProfile.name ?? "Anonymous"} disconnected`,
        date: new Date(),
      } as Message);
    }
    delete this.data[client.id];
  }

  @UseGuards(JwtAccessGuard)
  @SubscribeMessage("auth")
  auth(@ConnectedSocket() client: SocketWithUser, @MessageBody() room: string) {
    const alreadyFound = Object.entries(this.data).find(
      ([_, value]) => value.redis.socketId === client.id
    );

    if (alreadyFound) return; // check if already connected // TODO: handle in /game/join
    this.data[client.user.id] = {
      cached: { userProfile: toUserProfile(client.user) },
      redis: { socketId: client.id },
      sql: { room },
    };
    client.join(room);

    const [_userId, data] = Object.entries(this.data).find(
      ([_, value]) => value.redis.socketId === client.id
    )!;

    this.server.to(data.sql.room).emit("receive_message", {
      sender: systemProfile,
      text: `${client.user.name} connected`,
      date: new Date(),
    } as Message);

    // return failed...?
  }

  @UseGuards(JwtAccessGuard)
  @SubscribeMessage("send_message")
  send_message(
    @ConnectedSocket() client: SocketWithUser,
    @MessageBody() text: string
  ) {
    const found = Object.entries(this.data).find(
      ([_, value]) => value.redis.socketId === client.id
    )!;
    if (!found) return;
    const [_userId, data] = found;

    this.server.to(data.sql.room).emit("receive_message", {
      sender: toUserProfile(client.user),
      text,
      date: new Date(),
    } as Message);
  }
}
