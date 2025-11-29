import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRegenerateJwtMutation } from "@/features/settings/hooks/useRegnerateJwtMutation";

export function RegenerateJwt() {
  const { mutate, isPending } = useRegenerateJwtMutation();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Regenerate the JWT secret used to sign authentication tokens. This will immediately invalidate all existing
        sessions and log out all admins.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isPending}>
            Regenerate JWT Secret
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will regenerate the JWT signing secret and immediately log out ALL admins from ALL devices. This
              action cannot be undone. Everyone will need to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate()}>Yes, Regenerate Secret</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
