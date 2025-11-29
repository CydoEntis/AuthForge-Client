import type { z } from "zod";
import type { getAccountResponseSchema, updateEmailSchema } from "./account.schemas";

export type UpdateEmailRequest = z.infer<typeof updateEmailSchema>;
export type GetAccountResponse = z.infer<typeof getAccountResponseSchema>;
