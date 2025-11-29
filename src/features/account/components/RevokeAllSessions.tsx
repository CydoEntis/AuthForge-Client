import { useRevokeAllSessionsMutation } from "@/features/account/hooks/useRevokeAllSessionsMutation";
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

export function RevokeAllSessions() {
  const { mutate, isPending } = useRevokeAllSessionsMutation();

  return (
    <div className="space-y-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isPending}>
            Revoke All Sessions
          </Button>
        </AlertDialogTrigger>
        <p className="text-xs text-muted-foreground">
          This will log you out from all devices. You'll need to log in again everywhere.
        </p>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out from all devices and locations. You'll need to log in again everywhere.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke All Sessions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
