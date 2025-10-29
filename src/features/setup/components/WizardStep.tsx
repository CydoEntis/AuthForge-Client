import { AnimatePresence, motion } from "framer-motion";

type WizardStepProps = {
  isEmpty: boolean;
  selectionKey: string;
  configKey: string;
  selectionContent: React.ReactNode;
  configContent: React.ReactNode;
};

export function WizardStep({ isEmpty, selectionKey, configKey, selectionContent, configContent }: WizardStepProps) {
  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center min-h-[70vh]"
      transition={{ layout: { duration: 0.4, type: "spring" } }}
    >
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div
            key={selectionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex justify-center gap-6"
          >
            {selectionContent}
          </motion.div>
        ) : (
          <motion.div
            key={configKey}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl"
          >
            {configContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
