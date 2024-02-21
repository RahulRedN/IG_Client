import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaTeamspeak } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import classes from '../../Styles/Faqs.module.css'

const FaqSpeak = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
      });                 
    return ( 
        
        
        <motion.div
        ref={ref}
        initial={{ x: 100, opacity: 0 }} 
        animate={inView ? { x: 0, opacity: 1 } : "hidden"} 
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }} 
        className={classes.speak_container}
      >
        
          <h1>Haven’t found what youre looking for?</h1>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FaTeamspeak />}
              colorScheme="blue"
              variant="solid"
              size="lg"
            >
              Speak With Us
            </Button>
            <Link to="/contactus">
            <Button
              leftIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="outline"
              size="lg"
            >
              Contact Us
            </Button>
          </Link>
          </Stack>
        </motion.div> );
}
 
export default FaqSpeak;