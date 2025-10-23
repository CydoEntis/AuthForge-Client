import { useAuthForm } from "@/hooks/useAuthForm";
import { registerAdminSchema } from "../schemas";
import type { RegisterAdminValues } from "../types";

export function useRegisterAdminForm(onSubmit: (values: RegisterAdminValues) => void) {
  const form = useAuthForm<RegisterAdminValues>(registerAdminSchema, {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return { form, handleSubmit };
}
