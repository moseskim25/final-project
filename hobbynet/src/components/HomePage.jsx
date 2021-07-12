import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import UserProfile from "./UserProfile";
import "./styles/HomePage.scss";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export default function HomePage(props) {
  const { getUserInfo, getUserInterests, notify, socket, getConversations, setOtherUserId, getAllUsersInfo, allUsersInfo, setAllUsersInfo } = props;
  let history = useHistory();
  const [userInfo, setUserInfo] = useState({})

  const userId = cookies.get('user_id')

  const toSearchPage = () => {
    return history.push("/search");
  };


  useEffect(() => {
    getUserInfo(userId)
      .then(res => {
        setUserInfo(res.data)
        console.log(' what is respones.data:', res.data);
      })
  }, [])

  return (
    <div className="home-page-main">
      <div className="header">
        <div className="user-profile">
          <UserProfile getUserInfo={getUserInfo} getUserInterests={getUserInterests} notify={notify} socket={socket} />
        </div>
        <div className="sub-header-text">
          <div>
            <p>Great to see you, {userInfo.first_name}!</p>
            <p>Find a pal and discover new talents!</p>
          </div>
          <Button colorScheme="teal" variant="solid" className="button" onClick={toSearchPage}>
            Discover Your Talents
          </Button>
        </div>
      </div>

      <div className="trending">
        <p className='title'>What's Trending</p>
        <div className='trending-img-container'>
          <img src="https://res.cloudinary.com/dm4r202h4/image/upload/v1626045520/Screen_Shot_2021-07-11_at_7.17.36_PM_ythrrm.png" alt="" className="trending-img" />
          <img src="https://res.cloudinary.com/dm4r202h4/image/upload/v1626045827/Screen_Shot_2021-07-11_at_7.23.27_PM_enfw5o.png" alt="" className="trending-img" />
          <img src="https://images.pexels.com/photos/3774606/pexels-photo-3774606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="trending-img" />
        </div>
      </div>

      <div className="conversation">
        <p className='title'>Your Conversations</p>
        <div>
          <Conversations getConversations={getConversations} setOtherUserId={(otherUserId) => setOtherUserId(otherUserId)} getAllUsersInfo={(conversations) => getAllUsersInfo(conversations)} allUsersInfo={allUsersInfo} setAllUsersInfo={setAllUsersInfo} />
        </div>
      </div>
    </div>
  );
}
