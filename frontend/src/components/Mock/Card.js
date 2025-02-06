import React from "react";

const Card = ({children}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#a6d45f",
                width: "80vw",
                borderRadius: "20px",
            }}
        >
            {children}
        </div>
    );
};

export default Card;