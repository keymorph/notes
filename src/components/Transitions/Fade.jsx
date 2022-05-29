import {AnimatePresence, motion} from "framer-motion";

/**
 * Fade animation wrapper component
 *
 * @param {boolean} visible - Whether to fade in or out. You can use it to control the display state of the component
 * @param {boolean} [shouldFadeOnExit=true] - Whether to fade out on component unmount
 * @param {number} [duration=0.5] - Transition duration in milliseconds
 * @param {React.ReactNode} children - The children component to transition
 * @return {JSX.Element}
 */
export default function Fade({
  visible,
  shouldFadeOnExit = true,
  duration = 0.5,
  children,
}) {
  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: duration * 0.5,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial={visible ? "hidden" : "visible"}
        animate={visible ? "visible" : "hidden"}
        exit={shouldFadeOnExit ? "hidden" : "visible"}
        transition={{ type: "spring", bounce: 0.3, duration: duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
