import { motion } from "framer-motion";

const MotionWrapper = ({
  children,
  initial = { opacity: 0, y: 40 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;