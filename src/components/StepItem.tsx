interface StepItemProps {
  step: number;
  title: string;
  description: string;
  active?: boolean;
}

export function StepItem({ step, title, description, active }: StepItemProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex justify-center items-center border ${
            active ? "bg-linear-to-t from-primary/50 to-accent/50 inset-shadow" : "text-muted-foreground"
          }`}
        >
          <h3 className="text-lg font-semibold">{step}</h3>
        </div>
        <p className="font-bold">{title}</p>
      </div>
      <div className="ml-5 border-l-2 border-muted-foreground/30 pb-6">
        <p className="pl-9 text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
