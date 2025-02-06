import React, { useEffect, useState } from "react";

const WSD = () => {
  const [messages, setMessages] = useState([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=cruk569r01qm0ie3u5kgcruk569r01qm0ie3u5l0"
    );

    // Connection opened -> Subscribe to symbols
    socket.addEventListener("open", function () {
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
      );
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);

      if (data.type === "trade") {
        const now = Date.now();
        // Check if 30 seconds have passed since the last update
        if (now - lastUpdateTime >= 30000) {
          setMessages((prevMessages) => [...prevMessages, ...data.data]);
          setLastUpdateTime(now); // Update the last update time
        }
      }
    });

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, [lastUpdateTime]);

  return (
    <div>
      <h2>Real-Time Updates (Every 30 Seconds)</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>Symbol:</strong> {message.s} | <strong>Price:</strong>{" "}
            {message.p} | <strong>Volume:</strong> {message.v} |{" "}
            <strong>Timestamp:</strong> {new Date(message.t).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WSD;
