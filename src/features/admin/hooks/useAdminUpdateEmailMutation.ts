import { useQueryClient } from "@tanstack/react-query";
import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import type { AdminUpdateEmailRequest } from "../admin.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminUpdateEmailMutation(setError: UseFormSetError<AdminUpdateEmailRequest>) {
  const queryClient = useQueryClient();

  return useFormMutation({
    mutationFn: (values: AdminUpdateEmailRequest) => adminApi.updateEmail(values),
    setError,
    successMessage: "Email updated successfully",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
    },
  });
}
