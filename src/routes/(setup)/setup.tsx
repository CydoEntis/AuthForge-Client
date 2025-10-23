import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anvil } from "lucide-react";

export const Route = createFileRoute("/(setup)/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password confirmation is required." }),
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 ">
      <Card
        className="max-w-[500px] w-full rounded-xl px-6 pb-12 bg-background 
  bg-linear-to-b from-primary/15 via-background to-bg-background border-4 
    shadow-xl z-50"
      >
        <CardHeader className="text-center text-white text-2xl font-semibold mb-4">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-secondary p-2 border rounded-lg">
              <Anvil className="text-primary" size={24} />
            </div>
            <h3 className="text-foreground text-base font-semibold">Auth Forge</h3>
          </div>
          <h3 className="mt-4 text-2xl">Welcome to Auth Forge</h3>
          <p className="text-muted-foreground text-sm">Please make your admin account.</p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
