// Animation variants for consistent Framer Motion animations across the app

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.05
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: "#3B82F6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  blur: {
    scale: 1,
    borderColor: "#D1D5DB",
    boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  error: {
    scale: 1.02,
    borderColor: "#EF4444",
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      x: {
        duration: 0.5,
        ease: "easeInOut"
      },
      scale: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }
};

export const buttonVariants = {
  idle: {
    scale: 1,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  loading: {
    scale: 1,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  }
};

export const socialButtonVariants = {
  idle: {
    scale: 1,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export const loadingSpinnerVariants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const successVariants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

export const errorVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export const floatingLabelVariants = {
  focus: {
    y: -25,
    scale: 0.85,
    color: "#3B82F6",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  blur: {
    y: 0,
    scale: 1,
    color: "#6B7280",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};
