import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export default function Modal({ title, children, open, onOpenChange, className }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={` border-black sm:max-w-lg w-full ${className ?? ""}`}>
        <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>

        <motion.div layout className="flex flex-col gap-4">
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
