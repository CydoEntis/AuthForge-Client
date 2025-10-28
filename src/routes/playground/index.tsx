import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selected, setSelected] = useState("SQLite");

  const handleSelect = (name: string) => {
    setSelected(name);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <h3 className="text-4xl mb-6 text-white/70 font-semibold">Choose your database to get started</h3>

      <div className="flex flex-wrap gap-6 justify-center">
        <DatabaseOptionCard
          title="SQLite"
          description="No setup needed — start instantly with local storage"
          iconClass="devicon-sqlite-plain"
          selected={selected === "SQLite"}
          onSelect={() => handleSelect("SQLite")}
        />
        <DatabaseOptionCard
          title="PostgreSQL"
          description="Connect to your own Postgres instance using a connection string"
          iconClass="devicon-postgresql-plain"
          selected={selected === "PostgreSQL"}
          onSelect={() => handleSelect("PostgreSQL")}
        />
      </div>
    </section>
  );
}

function DatabaseOptionCard({
  title,
  description,
  iconClass,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  iconClass: string;
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
          : "bg-linear-to-b from-muted/20 via-background to-bg-background"
      }
      border-4 hover:scale-[1.02]`}
    >
      {selected && (
        <p className="bg-card/85 px-2 py-1 rounded-full absolute top-3 right-4 text-xs text-primary font-semibold  tracking-wide">
          Selected
        </p>
      )}

      <div
        className={`${iconClass} text-8xl text-foreground transition-all duration-300 ${
          selected ? "opacity-100 scale-105" : "opacity-70"
        }`}
      />

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
