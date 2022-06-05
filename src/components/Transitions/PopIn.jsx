import {motion} from "framer-motion";

/**
 * PopIn animation wrapper component
 *
 * @param {number} [duration=0.5] - Transition duration in milliseconds
 * @param {number} [delay=0] - Transition delay in milliseconds
 * @param {string} [maxHeight="25vh"] - Max height of the child element
 * @param {React.ReactNode} children - The children component to transition
 * @return {JSX.Element}
 */
export default function PopIn({
  duration = 0.5,
  delay = 0,
  maxHeight = "25vh",
  children,
}) {
  const variants = {
    hidden: {
      opacity: 0,
      maxHeight: 0,
      transition: {
        duration: duration * 0.5,
      },
    },
    visible: {
      opacity: 1,
      maxHeight: maxHeight,
      transition: {
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
    >
      {children}
    </motion.div>
  );
}
