// User can read normal text of jwt but cannot make hashed part of jwt
// Thus, I should not use googleId but id which is service id made by this project
// Although I use accessToken and refreshToken not to make user to login again to google,
// I will hide googleId, google accessToken, google refreshToken to prevent the possible threat
// Instead, I will use id to find user in database since I just need to use value that I can identify specific user

import type { User } from "@prisma/client";

// Also, if I only use service id, I can easily change or add other auth provider like facebook, github, etc.
export type JwtPayload = {
  id: User["id"];
};
