import { z } from "zod";
import type { loginAdminSchema, registerAdminSchema } from "./schemas";

export type RegisterAdminValues = z.infer<typeof registerAdminSchema>;
export type LoginAdminValues = z.infer<typeof loginAdminSchema>;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};
