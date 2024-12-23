import { Injectable } from "@nestjs/common";
import { Game, User } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

enum GameStatus {
  "waiting",
  "playing",
  "finished",
}

export type GameProfile = {
  id: string;
  status: GameStatus;
  rule: object; // Game Setting
};

export const toGameProfile = (game: Game): GameProfile => ({
  id: game.id,
  status: game.status as GameStatus,
  rule: game.rule as object,
});

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<Game | null> {
    return await this.prismaService.game.findUnique({ where: { id } });
  }

  async findAllOfUser(user: User): Promise<Game[]> {
    return await this.prismaService.game.findMany({
      where: {
        players: { some: { user: { id: user.id } } },
      },
    });
  }

  async findCurrentOfUser(user: User): Promise<Game | null> {
    const games = await this.prismaService.game.findMany({
      where: {
        AND: {
          OR: [
            { hostId: user.id },
            { players: { some: { user: { id: user.id } } } },
          ],
          status: { not: GameStatus.finished },
        },
      },
    });
    switch (games.length) {
      case 0:
        return null;
      case 1:
        return games[0];
      default:
        throw new Error("User has multiple ongoing games");
    }
  }

  async create(user: User): Promise<Game | null> {
    const currentGame = await this.findCurrentOfUser(user);
    if (currentGame !== null) {
      return null;
    }

    return await this.prismaService.game.create({
      data: { hostId: user.id },
    });
  }

  async update(user: User): Promise<Game | null> {
    const currentGame = await this.findCurrentOfUser(user);
    if (currentGame !== null) {
      return null;
    }

    return await this.prismaService.game.create({
      data: { hostId: user.id },
    });
  }

  async join(user: User, gameId: string): Promise<Game | null> {
    if (this.findCurrentOfUser(user) !== null) {
      return null;
    }

    const game = await this.find(gameId);
    if (
      game === null ||
      game.hostId === user.id ||
      game.status !== GameStatus.waiting
    ) {
      return null;
    }

    this.prismaService.player.create({
      data: {
        gameId: game.id,
        userId: user.id,
      },
    });
  }

  async leave(user: User, code: string): Promise<void> {
    const game = await this.prismaService.game.findUnique({ where: { code } });
    if (game) {
      const userIds = game.users as string[];
      const index = userIds.indexOf(user.id);
      if (index !== -1) {
        // remove player
        userIds.splice(index, 1);
        await this.prismaService.game.update({
          where: { code },
          data: { users: userIds },
        });
      }
    }
  }

  async start(code: string, rule: JSON): Promise<void> {
    await this.prismaService.game.update({
      where: { code },
      data: { rule: rule as unknown as InputJsonValue },
    });
  }
}
