import React from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { BACKEND_PORT } from "./Constants";

export const LoginUtil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passcode, setPasscode] = useState("");
    const [authkey, setAuthkey] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:${BACKEND_PORT}/api/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, passcode, authkey }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setLoading(false);
                navigate("/dashboard");
            } else {
                setLoading(false);
                message.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            message.error("An error occurred. Please try again.");
        }
    };

    const handleFinish = (values) => {
        for (const key in values) {
            if (values[key] === "email") {
                continue;
            } else {
                if (values[key] === "password") {
                    // Do something with the password value
                } else if (values[key] === "passcode") {
                    // Do something with the passcode value
                } else if (values[key] === "authkey") {
                    // Do something with the authkey value
                }
            }
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        passcode,
        setPasscode,
        authkey,
        setAuthkey,
        handleLogin,
        loading,
    };
}

