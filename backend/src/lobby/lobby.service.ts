import { Injectable } from "@nestjs/common";
import { Lobby, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { toUserProfile, UserProfile } from "src/user/user.service";
import { CreateLobbyDto } from "./lobby.dto";

type LobbyWithUser = Lobby & { host: User; participants: User[] };

export type LobbyProfile = Pick<Lobby, "id" | "name" | "description"> & {
  host: UserProfile;
  participants: UserProfile[];
};

export function toLobbyProfile(lobby: LobbyWithUser): LobbyProfile {
  return {
    id: lobby.id,
    name: lobby.name,
    description: lobby.description,
    host: toUserProfile(lobby.host),
    participants: lobby.participants.map(toUserProfile),
  };
}

@Injectable()
export class LobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { name, description, password }: CreateLobbyDto,
    user: User
  ): Promise<LobbyWithUser> {
    return await this.prismaService.lobby.create({
      data: {
        name,
        description,
        password: password ?? null,
        hostId: user.id,
        town: {},
        setting: {},
      },
      include: { host: true, participants: true },
    });
  }

  async join(id: string, user: User): Promise<LobbyWithUser> {
    return await this.prismaService.lobby.update({
      where: { id },
      data: { participants: { connect: { id: user.id } } },
      include: { host: true, participants: true },
    });
  }

  async leave(id: string, user: User): Promise<LobbyWithUser> {
    return await this.prismaService.lobby.update({
      where: { id },
      data: { participants: { disconnect: { id: user.id } } },
      include: { host: true, participants: true },
    });
  }

  async find(id: string): Promise<LobbyWithUser | null> {
    return await this.prismaService.lobby.findUnique({
      where: { id },
      include: { host: true, participants: true },
    });
  }

  async findAll(): Promise<LobbyWithUser[]> {
    return await this.prismaService.lobby.findMany({
      include: { host: true, participants: true },
    });
  }

  async current(user: User): Promise<LobbyWithUser | null> {
    return await this.prismaService.lobby.findFirst({
      where: { participants: { some: { id: user.id } } },
      include: { host: true, participants: true },
    });
  }
}
