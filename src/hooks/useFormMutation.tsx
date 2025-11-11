import { useMutation } from "@tanstack/react-query";
import type { FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/ApiError";

type UseFormMutationProps<TFormValues extends FieldValues, TResponse> = {
  mutationFn: (values: TFormValues) => Promise<TResponse>;
  setError: UseFormSetError<TFormValues>;
  successMessage?: string;
  onSuccess?: (data: TResponse) => void;
};

export function useFormMutation<TFormValues extends FieldValues, TResponse>({
  mutationFn,
  setError,
  successMessage,
  onSuccess,
}: UseFormMutationProps<TFormValues, TResponse>) {
  return useMutation<TResponse, unknown, TFormValues>({
    mutationFn: async (values) => {
      try {
        return await mutationFn(values);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.fieldErrors && error.fieldErrors.length > 0) {
            error.fieldErrors.forEach((fieldError) => {
              setError(fieldError.field as any, {
                type: "server",
                message: fieldError.message,
              });
            });
            toast.error(error.fieldErrors[0].message);
          } else {
            setError("root", {
              type: "server",
              message: error.message,
            });
            toast.error(error.message);
          }
        } else {
          setError("root", {
            type: "server",
            message: "Something went wrong",
          });
          toast.error("Something went wrong");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (successMessage) toast.success(successMessage);
      onSuccess?.(data);
    },
  });
}
