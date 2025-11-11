import { AnimatePresence, motion } from "framer-motion";

type WizardProps = {
  currentStep: number;
  children: React.ReactNode[];
};

export function Wizard({ currentStep, children }: WizardProps) {
  const child = children[currentStep - 1];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ x: -100, opacity: 0 }} // always come in from left
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }} // always exit to right
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );
}
