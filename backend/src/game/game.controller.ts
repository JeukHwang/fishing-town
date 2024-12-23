import { Body, Controller, Get } from "@nestjs/common";
import { User } from "@prisma/client";
import { CurrentUser } from "src/user/user.decorator";
import { JoinGameDto, UpdateSettingDto } from "./game.dto";
import { GameProfile, GameService, toGameProfile } from "./game.service";

@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

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
  ): Promise<GameProfile> {
    return await this.gameService.update(body);
  }

  @Get("join")
  async join(
    @CurrentUser() user: User,
    @Body() body: JoinGameDto
  ): Promise<GameProfile | null> {
    return await this.gameService.join(user, body.code);
  }

  @Get("start")
  async start(
    @CurrentUser() user: User,
    @Body() body: StartGameDto
  ): Promise<void> {
    return await this.gameService.start(body.code, body.rule);
  }
}
