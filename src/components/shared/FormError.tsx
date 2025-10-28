import { Alert, AlertTitle } from "../ui/alert";
import { CircleAlert } from "lucide-react";

type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

export default FormError;
