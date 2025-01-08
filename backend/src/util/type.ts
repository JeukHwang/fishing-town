import { User } from "@prisma/client";
import { Request } from "express";
import { Socket } from "socket.io";

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;

export type RequestWithUser = Request & { user: User };
export type SocketWithUser = Socket & { user: User };
