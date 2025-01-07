import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { CurrentUser } from "src/user/user.decorator";
import { CreateLobbyDto } from "./lobby.dto";
import { LobbyProfile, LobbyService, toLobbyProfile } from "./lobby.service";

@Controller("lobby")
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post("create")
  async create(
    @Body() body: CreateLobbyDto,
    @CurrentUser() user: User
  ): Promise<LobbyProfile> {
    const lobby = await this.lobbyService.create(body, user);
    return toLobbyProfile(lobby);
  }

  // TODO: enable only one of join and leave; so unfinished game for each user should be unique
  @Get("join/:id")
  async join(
    @Param("id") id: string,
    @CurrentUser() user: User
  ): Promise<LobbyProfile> {
    const lobby = await this.lobbyService.join(id, user);
    return toLobbyProfile(lobby);
  }

  @Get("leave/:id")
  async leave(
    @Param("id") id: string,
    @CurrentUser() user: User
  ): Promise<LobbyProfile> {
    const lobby = await this.lobbyService.leave(id, user);
    return toLobbyProfile(lobby);
  }

  @Get("find/all")
  async findAll(): Promise<LobbyProfile[]> {
    const lobbies = await this.lobbyService.findAll();
    return lobbies.map(toLobbyProfile);
  }

  @Get("find/:id")
  async find(@Param("id") id: string): Promise<LobbyProfile | null> {
    const lobby = await this.lobbyService.find(id);
    return lobby ? toLobbyProfile(lobby) : null;
  }

  @Get("current")
  async current(@CurrentUser() user: User): Promise<LobbyProfile | null> {
    const lobby = await this.lobbyService.current(user);
    return lobby ? toLobbyProfile(lobby) : null;
  }
}
