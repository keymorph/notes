//#region CSS Transitions
export const adornmentButtonTransition = {
  transition: "all 0.2s ease-in-out",
};
//#endregion

//#region Spring Transitions
export const springNote = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};
export const springNoteDrag = {
  type: "spring",
  stiffness: 10000,
  damping: 300,
};
export const springDefault = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export const springSlow = {
  type: "spring",
  bounce: 0.25,
  duration: 1.2,
};
export const spring = {
  type: "spring",
  bounce: 0.25,
  duration: 0.6,
};
export const springShort = {
  type: "spring",
  bounce: 0.25,
  duration: 0.5,
};
export const springShorter = {
  type: "spring",
  bounce: 0.25,
  duration: 0.4,
};
export const springShortest = {
  type: "spring",
  bounce: 0.25,
  duration: 0.2,
};
//#endregion

//#region Variants
export const variantFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export const variantFadeStagger = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: (i) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.02,
    },
  }),
};
export const variantFadeSlideDown = {
  hidden: { opacity: 0, y: -20, transition: springShortest },
  visible: { opacity: 1, y: 0, transition: springShorter },
};
export const variantFadeSlideDownStagger = {
  hidden: { opacity: 0, y: -20, transition: springShortest },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { ...springShorter, delay: i * 0.02 },
  }),
};
export const variantFadeSlideDownSlow = {
  hidden: { opacity: 0, y: -20, transition: springShort },
  visible: { opacity: 1, y: 0, transition: spring },
};
export const variantFadeSlideUp = {
  hidden: { opacity: 0, y: 20, transition: springShortest },
  visible: { opacity: 1, y: 0, transition: springShorter },
};
export const variantFadeSlideUpSlow = {
  hidden: { opacity: 0, y: 20, transition: springShort },
  visible: { opacity: 1, y: 0, transition: spring },
};
//#endregion
