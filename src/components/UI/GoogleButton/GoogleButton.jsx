import { Button } from "@chakra-ui/react";
import { Loader2 } from "lucide-react";
import { Icons } from "./Icon";

// eslint-disable-next-line react/prop-types
const GoogleButton = ({ isLoading, onClickHandler }) => {
  return (
    <Button
      leftIcon={isLoading?<Loader2 className='mr-2 h-5 w-5 animate-spin' />:<Icons.google className="h-5 w-5 mr-2" />}
      onClick={onClickHandler}
      disabled={!isLoading}
      height='3rem'
      width='20vw'
    >
      Signin With Google
    </Button>
  );
};

export default GoogleButton;
