import { Logo } from "./Logo";

export function PublicNavbar() {
  return (
    <div className="p-4 inset-shadow-sm bg-linear-to-t from-card to-background rounded-lg flex justify-between items-center border dark:border-black border-[#c7c7c7]">
      <div className="flex gap-2 items-center">
        <Logo size={18} />
        <h3 className="font-bold text-lg text-muted-foreground">Auth Forge</h3>
      </div>
      {/* Currently we dont want to manage a light mode */}
      {/* <ThemeToggle /> */}
    </div>
  );
}
