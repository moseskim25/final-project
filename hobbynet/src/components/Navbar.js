import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Menu,
  MenuList, 
  MenuButton,
  MenuItem,
  MenuDivider,
  Image,
  Center
} from "@chakra-ui/react";
import Toggle from './Toggle'
import { HamburgerIcon, ChevronDownIcon, EmailIcon, BellIcon, ViewIcon } from "@chakra-ui/icons";

const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      color='gray.600'
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          LOREM IPSUM
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        spacing="50px"
      >
             <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                mt={{ base: 4, md: 0 }}
                spacing="50px"
            >   
                <Stack display="flex" alignItems="center" spacing="0px" _hover={{opacity: 0.85}}>
                    <ViewIcon align="center"></ViewIcon>
                    <Text>Browse</Text>
                </Stack>
                <Stack display="flex" alignItems="center" spacing="0px" _hover={{opacity: 0.85}}>
                    <BellIcon align="center"></BellIcon>
                    <Text>Notifications</Text>
                </Stack>
                <Stack display="flex" alignItems="center" spacing="0px" _hover={{opacity: 0.85}}>
                    <EmailIcon align="center"></EmailIcon>
                    <Text>Messages</Text>
                </Stack>
                <Toggle></Toggle>

            </Stack>
            <Stack _hover={{color: "#b3b3b3"}}>
                <Menu>
                    <MenuButton>
                        <Stack direction="row">
                            <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src="https://placekitten.com/100/100"
                                alt="cute kitty"
                                mr="5px"
                            />
                            <Center>Moses Kim<ChevronDownIcon ml="5px"></ChevronDownIcon></Center>
                        </Stack>
                    </MenuButton>
                    <MenuList bg="white" color="black">
                        <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Profile</MenuItem>
                        <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Calender</MenuItem>
                        <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Settings</MenuItem>
                        <MenuDivider/>
                        <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Logout</MenuItem>
                    </MenuList>           
                </Menu>
            </Stack>
      </Stack>
    </Flex>
  );
};

export default Navbar;
