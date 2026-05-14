
import { User } from "../../../generated/prisma";
import { UserResponseDto } from "../dto/user-response.dto";

export const toUserResponseDto = (
  user: User,
): UserResponseDto => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname!,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});