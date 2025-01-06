import { Body, Controller, Get, Param } from "@nestjs/common";
import type { User } from "@prisma/client";
import { CurrentUser } from "../user/user.decorator.js";
import { JoinGameDto, UpdateSettingDto } from "./game.dto.js";
import { GameProfile, GameService, toGameProfile } from "./game.service.js";

const codeMap = new Map<string, string>([["1", "one"]]);
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("code/add/:key/:value")
  addCodeMap(
    @Param("key") key: string,
    @Param("value") value: string
  ): [string, string][] {
    codeMap.set(key, value);
    return [...codeMap.entries()];
  }

  @Get("code/remove/:key")
  removeCodeMap(@Param("key") key: string): [string, string][] {
    codeMap.delete(key);
    return [...codeMap.entries()];
  }

  @Get("code/all")
  getCodeMap(): [string, string][] {
    console.log(codeMap);
    return [...codeMap.entries()];
  }

  @Get("all")
  async findAll(@CurrentUser() user: User): Promise<GameProfile[]> {
    const games = await this.gameService.findAllOfUser(user);
    return games.map(toGameProfile);
  }

  @Get("current")
  async findCurrent(@CurrentUser() user: User): Promise<GameProfile | null> {
    const game = await this.gameService.findCurrentOfUser(user);
    return game ? toGameProfile(game) : null;
  }

  @Get("create")
  async create(@CurrentUser() user: User): Promise<GameProfile | null> {
    const game = await this.gameService.create(user);
    return game ? toGameProfile(game) : null;
  }

  @Get("update")
  async update(
    @CurrentUser() user: User,
    @Body() body: UpdateSettingDto
  ): Promise<void> {
    await this.gameService.update(user, body);
  }

  @Get("join")
  async join(
    @CurrentUser() user: User,
    @Body() body: JoinGameDto
  ): Promise<GameProfile | null> {
    const game = await this.gameService.join(user, body.id);
    return game ? toGameProfile(game) : null;
  }

  @Get("leave")
  async leave(@CurrentUser() user: User): Promise<void> {
    await this.gameService.leave(user);
  }

  @Get("start")
  async start(@CurrentUser() user: User): Promise<void> {
    return await this.gameService.start(user);
  }
}
