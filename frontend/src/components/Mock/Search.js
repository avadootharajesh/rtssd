import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { mockSearchResults } from "./Constants/Results";

import SearchResults from "./SearchResults";

const Search = () => {
  const [Input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState(mockSearchResults);
  const navigate = useNavigate();

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = (event) => {
    setBestMatches(mockSearchResults.result);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2vh",
        padding: "2vh 2vw",
        borderRadius: "20px",
        border: "1px solid black",
        width: "80vw",
        backgroundColor: "white",
        height: "10vh",
      }}
    >
      <input
        className="search-input"
        type="text"
        value={Input}
        style={{
          outline: "none",
          border: "none",
          borderBottom: "1px solid black",
          width: "100%",
          borderRadius: "20px",
          height: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "0 1vw",
        }}
        placeholder="Search"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      ></input>

      {Input && bestMatches.length > 0 ? (
        <SearchResults searchResults={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
