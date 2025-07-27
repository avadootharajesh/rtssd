import React, { useState } from "react";
import { Form, Input, Radio, Button, message } from "antd";
import "../styles/Login.css"; // Import your CSS file
import axios from "axios";
import { BACKEND_PORT } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";

const MultipleLogin = () => {
  const [form] = Form.useForm();
  const [selectedMethod, setSelectedMethod] = useState("password"); // Default login method

  const Navigate = useNavigate();

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    form.resetFields([selectedMethod]); // Reset the input field when method changes
  };

  const handleFinish = async (values) => {

    try {
      const response = await axios.post(
        `${process.env.BACKEND}/api/user/login`,
        {
          email: values.email,
          selectedMethod : selectedMethod,
          key: values[selectedMethod],
        },
        {
          withCredentials: true,
        }
      );
      const { Message, token, user } = response.data;
      message.success(Message);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
      // Redirect or perform further actions
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Login failed. Please try again.");
  };

  const getInputComponent = () => {
    switch (selectedMethod) {
      case "password":
        return (
          <Form.Item
            className="password-input"
            label="Login Key"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message:
                  "Password must contain at least one letter and one number!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
        );
      case "passcode":
        return (
          <Form.Item
            className="password-input passcode-input"
            label="Login Key"
            name="passcode"
            rules={[
              {
                required: true,
                message: "Please enter your passcode!",
              },
              {
                len: 6,
                message: "Passcode must be 6 digits!",
              },
            ]}
          >
            <Input placeholder="Enter your passcode" />
          </Form.Item>
        );
      case "authkey":
        return (
          <Form.Item
            className="password-input authkey-input"
            label="Login Key"
            name="authkey"
            rules={[
              {
                required: true,
                message: "Please enter your authentication key!",
              },
            ]}
          >
            <Input placeholder="Enter your authentication key" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <Form
        className="login-form"
        name="login-form"
        form={form}
        onFinish={handleFinish}
        autoComplete="on"
        onFinishFailed={handleFinishFailed}
      >
        {/* Fixed Email Input */}
        <Form.Item
          className="email-input"
          label="Email or Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email or username!",
            },
            {
              type: "temail",
              message: "The input is not a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Login Method Radio Selection */}
        <Radio.Group
          className="radio-group-password"
          onChange={handleMethodChange}
          value={selectedMethod}
        >
          <Radio.Button
            className="radio-button-password radiopass"
            value="password"
          >
            Password
          </Radio.Button>
          <Radio.Button
            className="radio-button-passcode radiopass"
            value="passcode"
          >
            Passcode
          </Radio.Button>
          <Radio.Button
            className="radio-button-authkey radiopass"
            value="authkey"
          >
            Auth Key
          </Radio.Button>
        </Radio.Group>

        {/* Dynamically Render Input Based on Selection */}
        {getInputComponent()}

        {/* Submit Button */}
        <div className="submit-button-div">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MultipleLogin;
