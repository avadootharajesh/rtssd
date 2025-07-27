import React from "react";

import { useState } from "react";

import FetchUser from "../Utils/FetchUser";

import "../styles/Profile.css";

const BACKEND_PORT = process.env.REACT_APP_BACKEND;
console.log(BACKEND_PORT);

async function getAuthKey() {
  try {

    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/authkey`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
    });
    
    const data = await response.json();

    if (response.ok && data.authkey) {
      return data.authkey;
    } else {
      console.error("Failed to fetch auth key:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching auth key:", error);
    return null;
  }
}


const Profile = () => {
  const user = FetchUser();
  if (!user) window.location.href = "/";

  const [authKey, setAuthKey] = useState(false);
  const [AuthKey, setAuthKeyData] = useState("");

  getAuthKey().then((data) => {
    if (data) {
      setAuthKeyData(data);
    }
  });

  return (
    <div className="container">
      <h1 className="profile-heading">Profile</h1>
        <div
          className="leftblock downblock"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
          }}
        >
          <p>Name: {user.fullname}</p>
          <p>Date of Joining : {user.dateofjoining}</p>
          <p>Email : {user.email}</p>
          <div
            className="passcode-section"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p>AuthKey :&nbsp;</p>
            {authKey && <p>{AuthKey}</p>}
            <button
              className="authKey"
              onClick={() => {
                setAuthKey(!authKey);
              }}
              style={{
                marginLeft: "10px",
                backgroundColor: "#d8d8d8",
                marginTop: "-10px",
                borderRadius: "50px",
                width: "80px",
                textAlign: "center",
              }}
            >
              {authKey ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Profile;
