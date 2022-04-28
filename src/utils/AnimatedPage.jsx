import {motion} from "framer-motion";

const animations = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    duration: {duration: 0.7}
}

const AnimatedPage = ({children}) => {
    return (
        <motion.div variant={animations} initial={animations.initial}
                    animate={animations.animate} exit={animations.exit} transition={animations.duration}>
            {children}
        </motion.div>
    )
}
export default AnimatedPage;