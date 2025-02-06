import React, { useEffect, useRef } from "react";

const TopStories = () => {
  const isScriptLoaded = useRef(false); // To ensure the script is loaded only once

  useEffect(() => {
    if (!isScriptLoaded.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;

      script.innerHTML = JSON.stringify({
        feedMode: "all_symbols",
        isTransparent: false,
        displayMode: "regular",
        width: 510,
        height: 550,
        colorTheme: "dark",
        locale: "en",
      });

      document
        .getElementById("tradingview-timeline-widget")
        .appendChild(script);
      isScriptLoaded.current = true; // Ensure the script only loads once
    }
  }, []);

  return (
    <div className="tsw tradingview-widget-container">
      <div
        id="tradingview-timeline-widget"
        className="tradingview-widget-container__widget"
      ></div>
    </div>
  );
};

export default TopStories;
