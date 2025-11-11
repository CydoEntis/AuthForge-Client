import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  children: React.ReactNode;
}

export function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  className,
  children,

  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...props} className={className}>
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
