import { motion } from "framer-motion";

interface AnimatedProps {
  readonly children: React.ReactNode;
}

export default function Animated({ children }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
