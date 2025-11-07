import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      {...props}
      className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20! "
    >
      {isLoading ? (
        <>
          <Spinner className="mr-2 inline-block" /> {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
