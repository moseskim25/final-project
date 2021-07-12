import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./MyProfile.scss";
import UploadImagePopup from './UploadImagePopup';
import ProfilePage from './ProfileLanding'
import { Center, VStack, Avatar, Flex, Stack, Text, Heading } from "@chakra-ui/react";
import moment from 'moment';
const cookies = new Cookies();


export default function MyProfile({ getUserInfo }) {

  const user_id = cookies.get("user_id");

  const [userData, setUserData] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    getUserInfo(user_id).then((res) => setUserData(res.data));
  }, [buttonPopup]);

  const openPopup = () => {
    return setButtonPopup(true);
  }

  const age = moment(userData.birthday, "YYYY-MM-DD").fromNow();

  return (
    <div class='edit_profile_1'>
      <Flex justify="space-around">
      <Center>
        <Stack>
          <Center>
            <Avatar src={userData.profile_image} height="20vh" width="20vh" size="2xl" onClick={openPopup} alt='' mb="2vh"></Avatar>
          </Center>
          <Center>
            <Heading className='data' grow='1' color={'gray.700'}>{userData.first_name} {userData.last_name}</Heading>
          </Center>
          <Center>
            <Text className='data' grow='1' color={'gray.600'}>{userData.email}</Text>
          </Center>
          <Center>
            <Text className='data' grow='1' fontWeight={'500'}>Canada</Text>
          </Center>

          
        </Stack>
        
      </Center>
      {/* <p class='title'>General account settings</p>
      <p class='title_desc'>Click on any item to edit</p> */}
      <VStack mb="2vh">
        <div className="edit_profile_2">
        <Stack>
          <Stack width="50vw">
            <Flex bg={'gray.100'} rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Name</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>{userData.first_name} {userData.last_name}</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>City</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>Toronto</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex bg={'gray.100'} rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Country</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>Canada</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Age</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>{age.match(/[0-9]+/)}</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex bg={'gray.100'} rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Gender</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>{userData.gender}</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Email</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>{userData.email}</Text>
                </Center>
              </Flex>
            </Flex>
            <Flex bg={'gray.100'} rounded="lg" padding="20px">
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='description' grow='1' color={'gray.600'}>Update Password</Text>
                </Center>
              </Flex>
              <Flex grow='1' w="5vh" h="2.5vh">
                <Center>
                  <Text className='data' grow='1' fontWeight={'500'}>********</Text>
                </Center>
              </Flex>
            </Flex>
          </Stack>
        </Stack>

        <UploadImagePopup trigger={buttonPopup} setButtonPopup={setButtonPopup} user_id={user_id} setUserData={setUserData}/>
      </div>
      </VStack>
      </Flex>
      <Center>
        <Stack w="5xl" h="20vh" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="15px">
          <Center>
            <Stack>
              <Heading>
                My Biography
              </Heading>
              <Text>
                You have no bio yet... create one now!
              </Text>
            </Stack>
          </Center>         
        </Stack>
      </Center>
    </div>
  );
}
