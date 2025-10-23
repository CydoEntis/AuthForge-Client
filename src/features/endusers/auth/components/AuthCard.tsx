import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AuthCardProps = {
  children: React.ReactNode;
};

function AuthCard({ children }: AuthCardProps) {
  return (
    <Card
      className="max-w-[500px] w-full rounded-xl px-6 pb-12 bg-background 
  bg-linear-to-b from-primary/15 via-background to-bg-background border-4 
    shadow-xl z-50"
    >
      <CardHeader className="text-center text-white text-2xl font-semibold mb-4">
        <div className="flex justify-center items-center gap-2"></div>
        <h3 className="mt-4 text-2xl">Welcome to Auth Forge</h3>
        <p className="text-muted-foreground text-sm">Please make your admin account.</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default AuthCard;
