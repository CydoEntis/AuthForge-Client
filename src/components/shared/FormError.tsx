import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CircleAlert } from "lucide-react";

type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Uh oh, something went wrong!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default FormError;
