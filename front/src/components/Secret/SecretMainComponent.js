import React, { useEffect, useState} from "react";
import axios from 'axios';
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from '../Header/LoginHeader';
import { useNavigate } from 'react-router-dom';
import './secretmain.scss';

const SecretMain = () => {

  const [friendsList, setFriendsLsit] = useState([]);
  const [myName, setMyName] = useState("");
  const navigate = useNavigate();

  const getFriendsList = async() => {
    await axios.get('http://localhost:8080/getSecretFriends')
    .then(response => {
      console.log(response.data);
      setFriendsLsit(response.data);
    }
    )
  }
  const getProfile = async() => {
    await axios.get('http://localhost:8080/getProfil')
    .then(response => {
      console.log(response.data);
      setMyName(response.data.accountName);
    })
  }


  const getFriendProfil = async(id, email) => {
    await axios.post('http://localhost:8080/getSecretProfil', {
      secretFriendId:id,
      friendEmail: email
    })
    .then(
      response => {
        navigate("/secretlist", {
         state:{
            myAccount:response.data[0].myAccount,
            friendAccount: response.data[0].friendAccount,
            postList:response.data[1]
         }
        })
      }
    )
  }

  useEffect(() => {
    getProfile();
    getFriendsList();
  }, [])

  return(
    <div>
      <LoginHeader />
      <SidebarAll />
      <div className="onlybody">
      <h1> {myName}님의 친구 목록입니다. <span class='dejavu'>&#x2680; &#x2681; &#x2682; &#x2683; &#x2684; &#x2685;</span></h1>

        {friendsList.length === 0 ? (
          <div>목록이 존재하지 않습니다.</div>
        ): (
          <div>
            <ul className="mylist">
            {friendsList.map(a => <li onClick={(e) => {getFriendProfil(a.secretFriendId, a.friendEmail);}} key={a.friendId}> 다이어리 이름 : {a.boardName}&nbsp;&nbsp; 친구 이름 : {a.friendName}  </li>)} 
            </ul>
          </div>
        )}
        </div>
    </div>
  )

}
export default SecretMain;