import { Injectable } from "@nestjs/common";
import { GameState, Lobby, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { toUserProfile, UserProfile } from "src/user/user.service";
import { CreateLobbyDto } from "./lobby.dto";

type LobbyWithUser = Lobby & { host: User; participants: User[] };

export type LobbyProfile = Pick<
  Lobby,
  "id" | "name" | "description" | "status"
> & {
  host: UserProfile;
  participants: UserProfile[];
};

export function toLobbyProfile(lobby: LobbyWithUser): LobbyProfile {
  return {
    id: lobby.id,
    name: lobby.name,
    description: lobby.description,
    status: lobby.status,
    host: toUserProfile(lobby.host),
    participants: lobby.participants.map(toUserProfile),
  };
}

@Injectable()
export class LobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { title, description, password }: CreateLobbyDto,
    user: User
  ): Promise<LobbyWithUser | null> {
    const current = await this.current(user);
    if (current !== null) return null;

    return await this.prismaService.lobby.create({
      data: {
        title,
        description,
        password: password ?? null,
        hostId: user.id,
        town: {},
        setting: {},
      },
      include: { host: true, participants: true },
    });
  }

  async join(id: string, user: User): Promise<LobbyWithUser | null> {
    const lobby = await this.find(id);
    if (lobby === null) return null;
    if (lobby.status !== GameState.Preparation) return null;

    const current = await this.current(user);
    if (current !== null) return null;
    // TODO: check password

    return await this.prismaService.lobby.update({
      where: { id },
      data: { participants: { connect: { id: user.id } } },
      include: { host: true, participants: true },
    });
  }

  async leave(id: string, user: User): Promise<LobbyWithUser | null> {
    const lobby = await this.find(id);
    if (lobby === null) return null;
    if (lobby.status !== GameState.Preparation) return null;

    const current = await this.current(user);
    if (current === null || current.id !== id) return null;

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
      where: {
        AND: [
          {
            OR: [
              { hostId: user.id },
              { participants: { some: { id: user.id } } },
            ],
          },
          { status: { not: GameState.Completion } },
        ],
      },
      include: { host: true, participants: true },
    });
  }

  async start(user: User): Promise<boolean> {
    const lobby = await this.current(user);
    if (lobby === null || lobby.hostId !== user.id) return false;
    if (lobby.setting === null) return false; // TODO: check if setting(rule) is valid

    await this.prismaService.lobby.update({
      where: { id: lobby.id },
      data: { status: GameState.Progress },
    });

    return true;
  }
}
