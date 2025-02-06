import React from "react";

const FetchUser = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } catch (error) {
        return false
    }
}

export default FetchUser