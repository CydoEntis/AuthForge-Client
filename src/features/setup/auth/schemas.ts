import z from "zod";

export const registerAdminSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(8, { message: "Password confirmation is required." }),
});

export const loginAdminSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(0, { message: "Password cannot be empty" }),
});

export const forgotPasswordAdminSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});
