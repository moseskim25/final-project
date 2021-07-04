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
  MenuDivider
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

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
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Chakra UI
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
      </Box>
      <Menu>
        {({ isOpen }) => (
            <>
            <MenuButton color="black" isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                Moses Kim
            </MenuButton>
            <MenuList color="black">
                <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Profile</MenuItem>
                <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Calender</MenuItem>
                <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Settings</MenuItem>
                <MenuDivider/>
                <MenuItem onClick={() => window.location.replace("http://www.w3schools.com")}>Logout</MenuItem>
            </MenuList>
            </>
        )}
    </Menu>
    </Flex>
  );
};

export default Navbar;
