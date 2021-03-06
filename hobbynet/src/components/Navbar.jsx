import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Box, Stack, Heading, Flex, Text, Button, useDisclosure, Menu, MenuList, MenuButton, MenuItem, MenuDivider, Image, Center } from "@chakra-ui/react";
import Toggle from "./Toggle";
import { HamburgerIcon, ChevronDownIcon, ChatIcon, BellIcon, WarningTwoIcon, SearchIcon } from "@chakra-ui/icons";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

// the really messy navbar component - currently this is the logged-in version and I need to make a not-logged-in one later and figure out how to cycle it in
const Navbar = (props) => {
  const { socket, notify } = props;
  const userId = cookies.get("user_id");

  let history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const handleToggle = () => (isOpen ? onClose() : onOpen());


  useEffect(() => {
    const getUserInfo = (user_id) => {
      return axios.get(`http://localhost:8000/users/${user_id}`)
    };

    getUserInfo(userId)
      .then((res) => {
        console.log('yes:', res.data);
        setUser(res.data);
      });
  }, [userId])

  useEffect(() => {
    // socket?.removeAllListeners()
    socket?.on("incomingMessage", (data) => {
      console.log("data:", data);
      console.log("user:", user);
      if (user.first_name && data.sender_first_name !== user.first_name && window.location.href !== 'http://localhost:3000/chats') {
        console.log("NAVBAR user", user);
        notify(`${data.sender_first_name}: ${data.msg}`);
      }
    });
  }, [socket]);

  // props.newMessage.notify()

  if (cookies.get("user_id") && user !== {}) {
    return (
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} color="gray.600" {...props}>
        <Flex align="center" mr={5} cursor="pointer" onClick={() => window.location.replace("/home")}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            {/* note to self: design a logo & title and stick it here later */}
            HOBBYNET
          </Heading>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>
        <Stack direction="row" align="center" justify="space-between" spacing="50px">
          <Stack direction={{ base: "column", md: "row" }} display={{ base: isOpen ? "block" : "none", md: "flex" }} width={{ base: "full", md: "auto" }} alignItems="center" mt={{ base: 4, md: 0 }} spacing="50px">
            {/* this is the navbar menu options, add/subtract later as necessary */}
            {/* <Stack display="flex" alignItems="center" spacing="0px" _hover={{ opacity: 0.85 }}>
              <Text align="center"><i class="fas fa-home"></i></Text>
              <Text></Text>
            </Stack> */}
            <Stack display="flex" alignItems="center" spacing="0px" _hover={{ opacity: 0.85 }}>
              <NavLink to="/search"><SearchIcon align="center" /></NavLink>
            </Stack>
            <Stack display="flex" alignItems="center" spacing="0px" _hover={{ opacity: 0.85 }}>
              <NavLink to="/chats"><ChatIcon align="center" /></NavLink>
            </Stack>
          </Stack>
          <Stack _hover={{ color: "#b3b3b3" }}>
            <Menu>
              <MenuButton>
                <Stack direction="row">
                  <Image boxSize="2rem" borderRadius="full" src={user.profile_image} alt="profile image" mr="5px" />
                  <Center>
                    {`${user.first_name} ${user.last_name}`}
                    <ChevronDownIcon ml="5px"></ChevronDownIcon>
                  </Center>
                </Stack>
              </MenuButton>
              {/* the dropdown list for a user - currently all redirects to w3schools but can update later */}
              <MenuList bg="white" color="black">
                <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => window.location.replace("/home")}>Home</MenuItem>
                <MenuItem>
                  <Toggle isLoggedIn={true}></Toggle>
                </MenuItem>
                {/* <MenuItem onClick={() => window.location.replace("/calender")}>Calender</MenuItem> */}
                {/* <MenuItem onClick={() => window.location.replace("/settings")}>Settings</MenuItem> */}
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    cookies.remove("user_id");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Flex>
    );
  }

  // if logged out:
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} color="gray.600" {...props}>
      <Flex align="center" mr={5}>
        <Heading cursor="pointer" onClick={() => window.location.replace("/home")} as="h1" size="lg" letterSpacing={"tighter"}>
          {/* note to self: design a logo & title and stick it here later */}
          HOBBYNET
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
      <Stack direction="row" align="center" justify="space-between" spacing="50px">
        <Stack direction={{ base: "column", md: "row" }} display={{ base: isOpen ? "block" : "none", md: "flex" }} width={{ base: "full", md: "auto" }} alignItems="center" mt={{ base: 4, md: 0 }} spacing="50px">
          {/* this is the navbar menu options, add/subtract later as necessary */}
          <Toggle isLoggedIn={false}></Toggle>
        </Stack>
        <Stack direction="row" spacing="30px">
          <Button as={"a"} fontSize={"md"} fontWeight={400} variant={"link"} href={"/login"}>
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"md"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"/register"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
export default Navbar;
