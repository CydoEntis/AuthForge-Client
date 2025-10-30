import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface FadeSlideProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  direction?: "up" | "down"; // slide direction
  duration?: number;
  style?: React.CSSProperties;
}

export default function FadeSlide({
  visible,
  children,
  className,
  direction = "down",
  duration = 0.2,
  style,
}: FadeSlideProps) {
  const yOffset = direction === "down" ? -4 : 4;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {visible && (
        <motion.div
          key="fade-slide"
          initial={{ opacity: 0, y: yOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: yOffset }}
          transition={{ duration, ease: "easeOut" }}
          className={className}
          style={style}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
