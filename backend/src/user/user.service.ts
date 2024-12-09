import { BadRequestException, Injectable } from "@nestjs/common";

import { Prisma, type User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import type { CreateDto } from "./dto/create.dto";

export type UserProfile = Pick<User, "id" | "email" | "name">;
export const toUserProfile = (user: User): UserProfile => ({
  id: user.id,
  email: user.email,
  name: user.name,
});

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userInfo: CreateDto): Promise<User> {
    try {
      const user: User = await this.prismaService.user.create({
        data: { ...userInfo },
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
          throw new BadRequestException("Unique constraint violated");
        }
      }
      throw e;
    }
  }

  async findAllProfile(): Promise<UserProfile[]> {
    const users: User[] = await this.prismaService.user.findMany();
    return users.map(toUserProfile);
  }

  async findById(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }

  async removeById(id: string) {
    // TODO: change into soft delete middleware
    await this.prismaService.user.updateMany({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    });
  }

  async getUserIfRefreshTokenMatches(
    id: string,
    refreshToken: string
  ): Promise<User | null> {
    const user: User | null = await this.findById(id);
    if (user && user.refreshToken) {
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refreshToken
      );
      if (isRefreshTokenMatching) {
        return user;
      }
    }
    return null;
  }

  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async removeRefreshToken(id: string): Promise<void> {
    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }
}
