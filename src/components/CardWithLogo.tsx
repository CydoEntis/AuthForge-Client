import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "./Logo";

type AuthCardProps = {
  title: string;
  subText?: string;
  children: React.ReactNode;
};

export function CardWithLogo({ title, subText, children }: AuthCardProps) {
  return (
    <Card className="max-w-[500px] w-full ">
      <CardHeader className="text-center text-foreground text-2xl font-semibold mb-4">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <Logo size={24} />
          </div>
          <h3>Auth Forge</h3>
        </div>
        <h3 className="mt-4 text-2xl">{title}</h3>
        <p className="text-muted-foreground text-sm">{subText}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
