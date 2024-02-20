import { Button } from "@chakra-ui/react";
import { Loader2 } from "lucide-react";

// eslint-disable-next-line react/prop-types
const ButtonS = ({ isLoading, onClickHandler, children }) => {
  return (
    <Button
      leftIcon={
        isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin " /> : null
      }
      backgroundColor="rgb(31,41,55)"  
      _hover={{ bg: '#000000' }}
      color={"white"}    
      fontSize="18px"
      fontWeight='semi'
      className="bg-red-200"
      onClick={onClickHandler}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default ButtonS;
