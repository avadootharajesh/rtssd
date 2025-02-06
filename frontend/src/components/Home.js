import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Home.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);

  const vels = () => {
    navigate("/dashboard");
  };

  const socialopens = social => {
    switch (social) {
      case "twitter":
        window.location.href = "https://twitter.com/";
        break;
      default:
        window.location.href = "https://github.com/";
        break;
    }
  }
  return (
    <div className="homecontainer">
      <div className="maincontainer">
        <h1 className="titlecard">Real Time Data Analysis</h1>
      </div>

      <div className="line"></div>
      <div className="socials">
        <p className="socialsheading">Socials</p>
        <a className="socialsicon twittersocial" target = "_blank" href="https://twitter.com/">
          <TwitterIcon className="twittericon" style={{ scale: "0.8" }} />
        </a>
        <a className="socialsicon discordsocial" target="_blank" href="https://github.com/">
          <GitHubIcon className="discordicon" />
        </a>
      </div>
    </div>
  );
}
