import React, { useEffect, useState } from "react";
import { Flex, Image, Box, Text, Center } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import "./styles/MyProfile.scss";
const cookies = new Cookies();

export default function MyProfile({ getUserInfo }) {
  const user_id = cookies.get("user_id");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserInfo(user_id).then((res) => setUserData(res.data));
  }, []);

  return (
    <Center>
      <Box border='1px solid black' width='25%' height='70vh' mt='25px'>
        <Flex className="myProfile" direction="column" align="center" mt="25px">
          <Box>
            <Flex direction="column" align="center">
              <Image borderRadius="full" src={userData.profile_image} alt="" />
              <Text fontSize='25px' borderRadius='lg'>{userData.first_name} {userData.last_name}</Text>
              <Text>We should put a description here</Text>
            </Flex>
          </Box>
          <Box></Box>
        </Flex>
      </Box>
    </Center>
  );
}
