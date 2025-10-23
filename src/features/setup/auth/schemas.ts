import z from "zod";

export const registerAdminSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(8, { message: "Password confirmation is required." }),
});
