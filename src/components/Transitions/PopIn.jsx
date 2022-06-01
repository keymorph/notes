import {motion} from "framer-motion";

/**
 * PopIn animation wrapper component
 *
 * @param {boolean} [shouldFadeOnExit=true] - Whether to fade out on component unmount
 * @param {number} [duration=0.5] - Transition duration in milliseconds
 * @param {number} [delay=0] - Transition delay in milliseconds
 * @param {string} [direction="up"] - Transition direction. Can be either "up" or "down"
 * @param {number} [staggerChildrenDelay=0] - Whether to stagger children. Defaults to 0 (no stagger)
 * @param {React.ReactNode} children - The children component to transition
 * @return {JSX.Element}
 */
export default function PopIn({
  shouldFadeOnExit = true,
  duration = 0.5,
  delay = 0,
  direction = "up",
  staggerChildrenDelay = 0,
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
      maxHeight: "25vh",
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
