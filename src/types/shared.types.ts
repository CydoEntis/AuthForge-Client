import type { domainSchema } from "@/schemas/shared.schemas";
import type z from "zod";

// ======================
//        Domain
// ======================
export type DomainConfig = z.infer<typeof domainSchema>;

// ======================
//        Email
// ======================

// ======================
//        Stuff
// ======================
