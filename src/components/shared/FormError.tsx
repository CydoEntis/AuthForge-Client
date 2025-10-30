import { Alert, AlertTitle } from "../ui/alert";
import { CircleAlert } from "lucide-react";

type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <Alert variant="destructive" className="bg-red-500/10! border-red-500/30">
      <CircleAlert />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

export default FormError;
