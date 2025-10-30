import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Lock } from "lucide-react";
import type { SetupWizardStep } from "../types";
import { Progress } from "@/components/ui/progress";

type WelcomeToSetupProps = {
  setStep: (step: SetupWizardStep) => void;
};

function WelcomeToSetup({ setStep }: WelcomeToSetupProps) {
  return (
    <div className="my-18 flex flex-col justify-center space-y-8">
      <span className="inline-flex px-2 py-1 border rounded-full gap-2 border-primary/30 bg-primary/10 text-sm items-center font-semibold mx-auto">
        Auth that just works <Lock size={16} />
      </span>

      <div className="space-y-4 w-3/4 mx-auto">
        <h3 className="text-5xl leading-tight font-bold text-center">Authentication, Your Way</h3>
        <p className="text-lg font-semibold text-center">
          From user login to password resets, Auth Forge lets you self-host authentication without sacrificing speed or
          security. Easy setup, full control, and zero surprises.
        </p>
      </div>

      <Card className="w-[650px] mx-auto p-4 bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Setup Progress</h3>
          <div className="px-1.5 py-1 bg-input rounded text-xs font-semibold shadow-md">Step 3 of 5</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full w-8 h-8 text-black flex justify-center items-center">
              <Check size={16} />
            </div>
            <p>Create Admin</p>
          </div>
          <div className="px-1.5 py-1 bg-primary/20 text-primary rounded text-xs font-semibold shadow-md">Complete</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="border border-primary/20 bg-primary/10 rounded-full w-8 h-8 text-primary flex justify-center items-center">
              2
            </div>
            <p>Choose Database</p>
          </div>
          <div className="px-1.5 py-1 border text-foreground rounded text-xs font-semibold shadow-md">Current</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-muted-foreground/20 rounded-full w-8 h-8 text-muted-foreground flex justify-center items-center">
              3
            </div>
            <p>Choose Email Provider</p>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={33} />
          <p className="text-sm text-muted-foreground">33% Complete - Keep going!</p>
        </div>
      </Card>

      <div className="flex flex-col justify-center items-center space-y-4">
        <h3 className="text-center text-muted-foreground">
          Time to forge your own authentication system. We’ll walk you through everything you need to get started.
        </h3>
        <Button
          className="border border-primary/30 bg-primary/10 text-foreground rounded"
          onClick={() => setStep("selectDatabase")}
        >
          Ready to Begin
        </Button>
      </div>
    </div>
  );
}

export default WelcomeToSetup;
