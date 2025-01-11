import { Injectable } from "@nestjs/common";
import { Game, GameState, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateSettingDto } from "./game.dto";

export type GameProfile = {
  id: string;
  status: GameState;
  rule: object; // Game Setting
};

export const toGameProfile = (game: Game): GameProfile => ({
  id: game.id,
  status: game.status as GameState,
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
    // TODO: prevent join two games
    const games = await this.prismaService.game.findMany({
      where: {
        AND: [
          {
            OR: [
              { hostId: user.id },
              { players: { some: { user: { id: user.id } } } },
            ],
          },
          { status: { not: GameState.Completion } },
        ],
      },
    });
    switch (games.length) {
      case 0:
        return null;
      case 1:
        return games[0]!;
      default:
        throw new Error("User has multiple ongoing games");
    }
  }

  async create(user: User): Promise<Game | null> {
    const currentGame = await this.findCurrentOfUser(user);
    if (currentGame !== null) return null;

    return await this.prismaService.game.create({
      data: { hostId: user.id },
    });
  }

  async update(user: User, body: UpdateSettingDto): Promise<void> {
    const currentGame = await this.findCurrentOfUser(user);
    if (currentGame === null || currentGame.hostId !== user.id) return;

    await this.prismaService.game.update({
      where: { id: currentGame.id },
      data: { rule: body.rule as unknown as object },
    });
  }

  async join(user: User, gameId: string): Promise<Game | null> {
    if (this.findCurrentOfUser(user) !== null) return null;

    const game = await this.find(gameId);
    if (
      game === null ||
      game.hostId === user.id ||
      game.status !== GameState.Preparation
    ) {
      return null;
    }

    await this.prismaService.player.create({
      data: { userId: user.id, gameId: game.id },
    });

    return game;
  }

  async leave(user: User): Promise<void> {
    const game = await this.findCurrentOfUser(user);
    if (game === null) return;

    const player = await this.prismaService.player.findFirst({
      where: {
        userId: user.id,
        gameId: game.id,
      },
    });
    if (player === null) return;
    await this.prismaService.player.delete({ where: { id: player.id } });
  }

  async start(user: User): Promise<void> {
    if (this.findCurrentOfUser(user) === null) return;
    // await this.prismaService.game.update({
    //   where: { id },
    //   data: { rule: rule as unknown as InputJsonValue },
    // });
  }
}
