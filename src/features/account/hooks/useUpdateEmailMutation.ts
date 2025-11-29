import { useQueryClient } from "@tanstack/react-query";
import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { accountApi } from "../account.api";
import type { UpdateEmailRequest } from "../account.types";

export function useUpdateEmailMutation(setError: UseFormSetError<UpdateEmailRequest>) {
  const queryClient = useQueryClient();

  return useFormMutation({
    mutationFn: (values: UpdateEmailRequest) => accountApi.updateEmail(values),
    setError,
    successMessage: "Email updated successfully",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["-profile"] });
    },
  });
}
