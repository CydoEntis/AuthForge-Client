import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type WelcomeToSetupProps = {
  onBegin: () => void;
};

const steps = [
  { label: "Create Admin", description: "Set up your admin account." },
  { label: "Choose Database", description: "Select and connect your preferred database." },
  { label: "Choose Email Provider", description: "Pick how your system will send reset emails." },
];

export default function WelcomeToSetup({ onBegin }: WelcomeToSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = true;
    const runLoop = async () => {
      while (active) {
        for (let i = 0; i <= steps.length; i++) {
          setCurrentStep(i);
          animateProgress((i / steps.length) * 100);
          if (i > 0) await new Promise((r) => setTimeout(r, 1200));
        }
        await new Promise((r) => setTimeout(r, 1500));
        setCurrentStep(0);
        animateProgress(0);
        await new Promise((r) => setTimeout(r, 800));
      }
    };
    runLoop();
    return () => {
      active = false;
    };
  }, []);

  const animateProgress = (target: number) => {
    const start = progress;
    const startTime = performance.now();
    const duration = 800;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const eased = start + (target - start) * pct;
      setProgress(eased);
      if (pct < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const getProgressMessage = (value: number) => {
    if (value < 30) return "Warming up...";
    if (value < 60) return "Making progress...";
    if (value < 90) return "Almost there...";
    return "Setup complete!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-18 flex flex-col justify-center space-y-8"
    >
      <span className="inline-flex px-2 py-1 border rounded-full gap-2 border-primary/30 bg-primary/10 text-sm items-center font-semibold mx-auto">
        Auth that just works <Lock size={16} />
      </span>

      <div className="space-y-4 w-3/4 mx-auto">
        <h3 className="text-5xl leading-tight font-bold text-center">Authentication, Your Way</h3>
        <p className="text-lg font-semibold text-center text-muted-foreground">
          From user login to password resets, Auth Forge lets you self-host authentication without sacrificing speed or
          security. Easy setup, full control, and zero surprises.
        </p>
      </div>

      <AnimatePresence>
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="w-[650px] mx-auto p-6 bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Setup Progress</h3>
              <div className="px-2 py-1 bg-input rounded text-xs font-semibold shadow-md">
                Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
              </div>
            </div>

            <div className="space-y-5 mb-4">
              {steps.map((step, idx) => {
                const isComplete = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex justify-between items-start"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full w-8 h-8 flex justify-center items-center shrink-0 ${
                            isComplete
                              ? "bg-primary text-black"
                              : isCurrent
                                ? "border border-primary/20 bg-primary/10 text-primary"
                                : "bg-muted-foreground/20 text-muted-foreground"
                          }`}
                        >
                          {isComplete ? <Check size={16} /> : idx + 1}
                        </div>
                        <p className="font-medium">{step.label}</p>
                      </div>
                      <p className="text-sm text-muted-foreground ml-10">{step.description}</p>
                    </div>

                    <div
                      className={`px-1.5 py-1 rounded text-xs font-semibold shadow-md ${
                        isComplete
                          ? "bg-primary/20 text-primary"
                          : isCurrent
                            ? "border text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {isComplete ? "Complete" : isCurrent ? "Current" : ""}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-2">
              <Progress value={progress} />
              <motion.p
                key={getProgressMessage(progress)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-muted-foreground"
              >
                {Math.round(progress)}% — {getProgressMessage(progress)}
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col justify-center items-center space-y-4">
        <h3 className="text-center text-muted-foreground">
          Time to forge your own authentication system. We’ll walk you through everything you need to get started.
        </h3>
        <Button className="border border-primary/30 bg-primary/10 text-foreground rounded" onClick={onBegin}>
          Ready to Begin
        </Button>
      </div>
    </motion.div>
  );
}
