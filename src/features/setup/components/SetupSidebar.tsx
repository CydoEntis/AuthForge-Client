export function SetupSidebar({ currentStep }: { currentStep: number }) {
  const steps = [
    { title: "Choose a database", description: "Where to store data" },
    { title: "Choose an email provider", description: "How to send notifications" },
    { title: "Create admin account", description: "Admin setup" },
  ];

  return (
    <div className="w-1/4 border rounded-xl p-12 bg-linear-to-t from-card to-background">
      {steps.map((s, i) => (
        <div key={i}>
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex justify-center items-center border ${
                currentStep === i + 1 ? "border-primary text-primary" : "text-muted-foreground"
              }`}
            >
              <h3 className="text-lg font-semibold">{i + 1}</h3>
            </div>
            <p className={`font-bold ${currentStep === i + 1 ? "text-primary" : ""}`}>{s.title}</p>
          </div>
          <div className="ml-5 border-l-2 border-muted-foreground/30 pb-6">
            <p className="pl-9 text-muted-foreground text-sm">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
