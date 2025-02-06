import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol }) {
  const container = useRef();

  useEffect(() => {
    // Check if the TradingView script is already loaded
    if (!document.getElementById("tradingview-widget-script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = "tradingview-widget-script"; // Add an ID for the script
      script.innerHTML = `
        {
          "width": "850",
          "height": "500",
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    } else {
      console.log("TradingView widget script is already loaded.");
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="w2 tradingview-widget-container" ref={container}>
      <div className="w2a tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
