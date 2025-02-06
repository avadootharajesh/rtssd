import React from "react";

const SearchResults = ({ searchResults }) => {
  return (
    <ul
      className="searchresultsdiv"
      style={{
        border: "1px solid black",
        borderRadius: "20px",
        overflowY: "scroll",
      }}
    >
      {searchResults.map((result) => (
        <li
          key={result.symbol}
          style={{
            borderBottom: "1px solid black",
            padding: "1vh 1vw",
            margin: "0 2vw",
            cursor: "pointer",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{result.symbol}</span>
          <span>{result.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
