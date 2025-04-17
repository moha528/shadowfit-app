type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
type FadeConfig = {
    direction?: Direction;
    duration?: number;
    distance?: number;
    reverse?: boolean;
}

export const createFadeAnimation = ({
    direction = 'none',
    duration = 0.3,
    distance = 20,
    reverse = false
}: FadeConfig = {}) => {
    const getDirectionalProps = () => {
        switch (direction) {
            case 'up':
                return { y: reverse ? -distance : distance };
            case 'down':
                return { y: reverse ? distance : -distance };
            case 'left':
                return { x: reverse ? -distance : distance };
            case 'right':
                return { x: reverse ? distance : -distance };
            default:
                return {};
        }
    };

    return {
        initial: {
            opacity: reverse ? 1 : 0,
            ...getDirectionalProps()
        },
        animate: {
            opacity: reverse ? 0 : 1,
            x: 0,
            y: 0
        },
        exit: {
            opacity: reverse ? 1 : 0,
            ...getDirectionalProps()
        },
        transition: {
            duration
        }
    };
};

export const fadeInUp = createFadeAnimation({ direction: 'up' });
export const fadeInDown = createFadeAnimation({ direction: 'down' });
export const fadeInLeft = createFadeAnimation({ direction: 'left' });
export const fadeInRight = createFadeAnimation({ direction: 'right' });
export const fadeIn = createFadeAnimation();
export const fadeOut = createFadeAnimation({ reverse: true });

export const zoomInPulse = {
    initial: { opacity: 0, scale: 0.8, rotate: 5, filter: 'blur(5px)' },
    animate: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0, 
        filter: 'blur(0px)',
        transition: { 
            duration: 0.5, 
            ease: 'easeOut', 
            scale: { type: 'spring', stiffness: 200, damping: 10 }
        }
    },
    exit: { 
        opacity: 0, 
        scale: 0.8, 
        rotate: -5, 
        filter: 'blur(5px)', 
        transition: { duration: 0.4 }
    }
};

export const bounceIn = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.6, 
            type: 'spring', 
            bounce: 0.4,
            staggerChildren: 0.1 // For child elements
        }
    },
    exit: { 
        opacity: 0, 
        y: -50, 
        scale: 0.9, 
        transition: { duration: 0.4 }
    }
};

export const spinFade = {
    initial: { opacity: 0, rotate: -90, transformOrigin: 'bottom left' },
    animate: { 
        opacity: 1, 
        rotate: 0, 
        transformOrigin: 'bottom left',
        transition: { 
            duration: 0.7, 
            ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier
            rotate: { type: 'spring', stiffness: 100 }
        }
    },
    exit: { 
        opacity: 0, 
        rotate: 90, 
        transition: { duration: 0.5 }
    }
};

export const elasticSlide = {
    initial: { opacity: 0, x: -100, skewX: 20 },
    animate: { 
        opacity: 1, 
        x: 0, 
        skewX: 0,
        transition: { 
            duration: 0.8, 
            type: 'spring', 
            stiffness: 150, 
            damping: 15,
            skewX: { duration: 0.3 }
        }
    },
    exit: { 
        opacity: 0, 
        x: 100, 
        skewX: -20, 
        transition: { duration: 0.5 }
    }
};

export const waveIn = {
    initial: { opacity: 0, y: 30, rotateX: 45 },
    animate: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
            duration: 0.6, 
            ease: 'easeInOut',
            staggerChildren: 0.15, // Sequential wave effect
            delayChildren: 0.2
        }
    },
    exit: { 
        opacity: 0, 
        y: -30, 
        rotateX: -45, 
        transition: { duration: 0.4 }
    }
};

export const glowExpand = {
    initial: { opacity: 0, scale: 0.5, filter: 'brightness(50%)' },
    animate: { 
        opacity: 1, 
        scale: 1, 
        filter: 'brightness(100%)',
        transition: { 
            duration: 0.7, 
            ease: 'easeOut',
            filter: { duration: 0.4 },
            scale: { type: 'spring', stiffness: 120, damping: 12 }
        }
    },
    exit: { 
        opacity: 0, 
        scale: 0.5, 
        filter: 'brightness(50%)', 
        transition: { duration: 0.5 }
    }
};

export const flipIn = {
    initial: { opacity: 0, rotateY: 90, perspective: 1000 },
    animate: { 
        opacity: 1, 
        rotateY: 0, 
        perspective: 1000,
        transition: { 
            duration: 0.6, 
            ease: 'easeOut',
            rotateY: { type: 'spring', stiffness: 100 }
        }
    },
    exit: { 
        opacity: 0, 
        rotateY: -90, 
        transition: { duration: 0.4 }
    }
};

export const staggeredFade = {
    initial: { opacity: 0 },
    animate: { 
        opacity: 1,
        transition: { 
            duration: 0.5, 
            staggerChildren: 0.1, 
            delayChildren: 0.3 
        }
    },
    exit: { 
        opacity: 0, 
        transition: { duration: 0.3 }
    }
};