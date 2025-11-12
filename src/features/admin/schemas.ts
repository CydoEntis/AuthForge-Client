import z from "zod";

export const loginAdminSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const forgotPasswordAdminSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});
