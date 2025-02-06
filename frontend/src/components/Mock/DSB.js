import React from "react";

import Card from "./Card";

import { mockCompanyDetails } from "./Constants/Results";

import Search from "./Search";

const DSB = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="heading-mock"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2vh",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
          }}
        >
          {" "}
          {mockCompanyDetails.name}{" "}
        </h1>

        <Search />
      </div>

      <div className="carddiv">
        <Card> Card 1 </Card>
      </div>

      <div className="carddiv">
        <Card> Card 2 </Card>
      </div>

      <div className="carddiv">
        <Card> Card 3 </Card>
      </div>

      <div className="carddiv">
        <Card> Card 4 </Card>
      </div>

      <div className="carddiv">
        <Card> Card 5 </Card>
      </div>
    </div>
  );
};

export default DSB;
