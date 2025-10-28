import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Anvil, ArrowRight, Check, Mail } from "lucide-react";
import ResendBlack from "../../../public/resend-icon-black.svg";
import ResendWhite from "../../../public/resend-icon-white.svg";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { useTheme } from "@/features/theme/hooks/useTheme";
import type { ReactNode } from "react";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme } = useTheme();

  const [selectedDatabase, setSelectedDatabase] = useState("SQLite");
  const [selectedEmail, setSelectedEmail] = useState("SMTP");
  console.log(theme);
  let resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  return (
    <section className="relative mx-auto max-w-3/5 h-screen py-4">
      <nav className="flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="bg-card  flex aspect-square size-8 items-center justify-center rounded-lg">
            <Anvil className="text-orange-400" size={20} />
          </div>
          Auth Forge
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/dashboard">
              <Button className="rounded-full">Login</Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <Button className="rounded-full" variant="outline">
                Sign Up
              </Button>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      <section className="min-h-screen flex flex-col justify-center items-center gap-16">
        {/* --- Database Selection --- */}
        <div>
          <h3 className="text-4xl mb-6 text-muted-foreground font-semibold">Choose your database to get started</h3>

          <div className="flex flex-wrap gap-6 justify-center">
            <SetupOptionCard
              title="SQLite"
              description="No setup needed — start instantly with local storage"
              iconClass="devicon-sqlite-plain"
              selected={selectedDatabase === "SQLite"}
              onSelect={() => setSelectedDatabase("SQLite")}
            />
            <SetupOptionCard
              title="PostgreSQL"
              description="Connect to your own Postgres instance using a connection string"
              iconClass="devicon-postgresql-plain"
              selected={selectedDatabase === "PostgreSQL"}
              onSelect={() => setSelectedDatabase("PostgreSQL")}
            />
          </div>
        </div>

        {/* --- Email Provider Selection --- */}
        <div>
          <h3 className="text-4xl mb-6 text-muted-foreground font-semibold">Choose your email provider</h3>

          <div className="flex flex-wrap gap-6 justify-center">
            <SetupOptionCard
              title="SMTP"
              description="Use your existing SMTP credentials for sending mail"
              icon={<Mail size={80} />}
              selected={selectedEmail === "SMTP"}
              onSelect={() => setSelectedEmail("SMTP")}
            />
            <SetupOptionCard
              title="Resend"
              description="Use Resend’s modern email API for reliable delivery"
              imageSrc={resendImg}
              selected={selectedEmail === "Resend"}
              onSelect={() => setSelectedEmail("Resend")}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

function SetupOptionCard({
  title,
  description,
  iconClass,
  imageSrc,
  icon,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  iconClass?: string;
  imageSrc?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      onClick={onSelect}
      className={`max-w-xs aspect-3/4 w-full rounded-xl p-6 relative flex flex-col justify-evenly items-center
      transition-all duration-300 cursor-pointer border-4
      ${
        selected
          ? "bg-linear-to-b from-primary/30 via-background to-bg-background border-primary/70 shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
          : "bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30"
      }
      hover:scale-[1.02]`}
    >
      {selected && (
        <p className="bg-card/85 px-2 py-1 rounded-full absolute top-3 right-4 text-xs text-primary font-semibold tracking-wide">
          Selected
        </p>
      )}

      {imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className={`w-28 h-28 object-contain transition-all duration-300 ${
            selected ? "opacity-100 scale-105" : "opacity-70"
          }`}
        />
      ) : icon ? (
        <div
          className={`transition-all duration-300 text-foreground ${selected ? "opacity-100 scale-105" : "opacity-70"}`}
        >
          {icon}
        </div>
      ) : iconClass ? (
        <div
          className={`${iconClass} text-8xl text-foreground transition-all duration-300 ${
            selected ? "opacity-100 scale-105" : "opacity-70"
          }`}
        />
      ) : null}

      <div className="text-center space-y-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
      </div>

      <Button
        className={`rounded-full w-[50px] h-[50px] transition-all duration-300 ${
          selected
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
            : "border border-primary/10 bg-primary/20 text-primary hover:bg-primary/30"
        }`}
      >
        {selected ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </Button>
    </Card>
  );
}
