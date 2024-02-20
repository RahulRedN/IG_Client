import { Search, BellRing } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
} from "@chakra-ui/react";
import photo from "../../../public/images/IG_logo_Dark.png";

const Navbar_Admin = () => {
  return (
    <div className="h-13">
      <div className="flex justify-between items-center h-full px-2">
        <div className="relative flex items-center ">
          <Search
            className="absolute top-3.5 left-2"
            size={18}
            color="#9ca3af"
          />
          <input
            className=" py-3 pl-8 placeholder:text-sm hover:border-gray-200 focus:border-gray-200 outline-none"
            placeholder="Search here..."
          />
        </div>
        <div className="flex items-center p-3 gap-x-4">
          <div className="relative">
            <p className="absolute bg-amber-500 text-xs rounded-full h-3.5 w-3.5 text-center left-3 bottom-4">
              5
            </p>
            <BellRing />
          </div>
          <Menu>
            <MenuButton as={Button} colorScheme="white">
              <div className="bg-gray-200 hover:bg-gray-300 rounded-lg p-5 flex items-center justify-center">
                <img src={photo} className="absolute h-6 w-6 object-cover" />
              </div>
            </MenuButton>
            <MenuList minWidth={160}>
              <MenuGroup title="Welcome Admin!" fontSize={13}>
                <MenuItem>Team</MenuItem>
                <MenuItem _hover={{ bg: "red.100", textColor: "red.500" }}>
                  LogOut{" "}
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar_Admin;
