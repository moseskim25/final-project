import React, { useState } from "react";
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

// the really messy navbar component - currently this is the logged-in version and I need to make a not-logged-in one later and figure out how to cycle it in
const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  if(isLoggedIn) {
    return (<Flex
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
          {/* note to self: design a logo & title and stick it here later */}
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
                {/* this is the navbar menu options, add/subtract later as necessary */}
                <Stack display="flex" alignItems="center" spacing="0px" _hover={{opacity: 0.85}}>
                    <ViewIcon align="center"></ViewIcon>
                    <Text>Connect</Text>
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
                    {/* the dropdown list for a user - currently all redirects to w3schools but can update later */}
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
    )}
    return (<Flex
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
          {/* note to self: design a logo & title and stick it here later */}
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
                {/* this is the navbar menu options, add/subtract later as necessary */}
                <Toggle></Toggle>

            </Stack>
            <Stack 
              direction="row"
              spacing="30px"
            >
              <Button
                as={'a'}
                fontSize={'md'}
                fontWeight={400}
                variant={'link'}
                href={'#'}>
                Sign In
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'md'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                  bg: 'pink.300',
                }}>
                Sign Up
              </Button>
            </Stack>
      </Stack>
    </Flex>
    )
  }
export default Navbar;
