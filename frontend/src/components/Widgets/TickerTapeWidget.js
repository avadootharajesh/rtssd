import React, { useEffect, useRef } from "react";

const TickerTapeWidget = () => {
  const isScriptLoaded = useRef(false); // To ensure the script is loaded only once

  useEffect(() => {
    if (!isScriptLoaded.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
      script.async = true;

      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500 Index",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "US 100 Cash CFD",
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR to USD",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "Ethereum",
          },
        ],
        isTransparent: true,
        showSymbolLogo: false,
        colorTheme: "light",
        locale: "en",
      });

      document.getElementById("tradingview-ticker-widget").appendChild(script);
      isScriptLoaded.current = true; // Mark the script as loaded to avoid re-injection
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full">
      <div
        id="tradingview-ticker-widget"
        className="tradingview-widget-container__widget"
      ></div>
    </div>
  );
};

export default TickerTapeWidget;
