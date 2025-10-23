import { z } from "zod";
import type { forgotPasswordAdminSchema, loginAdminSchema, registerAdminSchema } from "./schemas";

export type RegisterAdminValues = z.infer<typeof registerAdminSchema>;
export type LoginAdminValues = z.infer<typeof loginAdminSchema>;
export type ForgotPasswordAdminValues = z.infer<typeof forgotPasswordAdminSchema>;

export type LoginAdminResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

export type ForgotPasswordAdminResponse = {
  message: string;
};
