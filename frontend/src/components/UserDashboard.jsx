import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";

import "../styles/UserDashboard.css";

import FetchUser from "../Utils/FetchUser";

import TradingViewWidget from "./Widgets/TradingViewWidget";
import TickerTapeWidget from "./Widgets/TickerTapeWidget";
import TopStories from "./Widgets/TopStories";
// import Converter from "./Widgets/Converter";

const UserDashboard = () => {

  if (!FetchUser()) {
    window.location.href = "/login";
  }

  return (
    <div
      className="userdashboarddiv"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: "2vh",
        padding: "2vh 2vw",
      }}
    >
      <div className="widgets">
        <div className="widgets-a">
          <TickerTapeWidget key="0" />
          <TradingViewWidget
            symbol={"BTCUSDT"}
            className="tradingviewwidget"
            key="1"
          />
        </div>
        <div className="widgets-b">
          <TopStories key="2" />
        </div>
      </div>
      {/* <Converter key="3" /> */}
    </div>
  );
};

export default UserDashboard;
