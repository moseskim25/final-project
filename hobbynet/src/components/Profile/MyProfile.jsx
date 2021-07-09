import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "../styles/MyProfile.scss";
import UploadImagePopup from './UploadImagePopup';
import { Center, VStack } from "@chakra-ui/react";
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
      <Center>
      <VStack>
        <p class='title'>General account settings</p>
        <p class='title_desc'>Click on any item to edit</p>
      </VStack>
      </Center>
      <div className="edit_profile_2">
        <div class='image'>
          <img src={userData.profile_image} onClick={openPopup} alt=''/>
        </div>

        <UploadImagePopup trigger={buttonPopup} setButtonPopup={setButtonPopup} user_id={user_id} setUserData={setUserData}/>

        <div className='edit_profile_3'>
          <p class='title'>Personal Details</p>
          <div className='double'>
            <div className='personal_info'>
              <p className='description'>First Name</p>
              <p className='data'>{userData.first_name}</p>
            </div>
            <div className='personal_info'>
              <p className='description'>Last Name</p>
              <p className='data'>{userData.last_name}</p>
            </div>
          </div>

          <div className='double'>
            <div className='personal_info'>
              <p className='description'>City</p>
              <p className='data'>Toronto</p>
            </div>
            <div className='personal_info'>
              <p className='description'>Country</p>
              <p className='data'>Canada</p>
            </div>
          </div>

          <div className='double'>
            <div className='personal_info'>
              <p className='description'>Age</p>
              <p className='data'>{age.match(/[0-9]+/)}</p>
            </div>
            <div className='personal_info'>
              <p className='description'>Gender</p>
              <p className='data'>{userData.gender}</p>
            </div>
          </div>
        </div>

        <div class='edit_profile_3'>
          <p class='title'>Login Details</p>

          <div className='personal_info'>
            <p className='description'>Email</p>
            <p className='data'>{userData.email}</p>
          </div>
          <div className='personal_info'>
            <p className='description'>Update Password</p>
            <p className='data'>********</p>
          </div>
        </div>
      </div>
    </div>
  );
}
