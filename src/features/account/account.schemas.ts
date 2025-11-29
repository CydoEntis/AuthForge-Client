import z from "zod";

export const updateEmailSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const getAccountResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAtUtc: z.string(),
  updatedAtUtc: z.string().nullable(),
});
