import { ThemeToggle } from "@/features/theme/ThemeToggle";

export function PublicNavbar() {
  return (
    <div className="p-4 inset-shadow-sm bg-linear-to-t from-card to-background rounded-lg flex justify-between items-center border dark:border-black border-[#c7c7c7]">
      <div className="flex gap-2 items-center">
        <h3 className="font-bold text-lg text-muted-foreground">Auth Forge</h3>
      </div>
      <ThemeToggle />
    </div>
  );
}
