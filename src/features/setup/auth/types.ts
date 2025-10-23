import { z } from "zod";
import type { registerAdminSchema } from "./schemas";

export type RegisterAdminValues = z.infer<typeof registerAdminSchema>;
