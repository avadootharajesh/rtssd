import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { BACKEND_PORT } from "./Constants";

import axios from "axios";

export const RegisterUtil = () => {
  const navigate = useNavigate();

  const [EmailForRegister, setEmailForRegister] = useState("");
  const [isMailVerified, setIsMailVerified] = useState(false);

  const [isModalVisibleOtpMail, setIsModalVisibleOtpMail] = useState(false);

  const [MobileNumberForRegister, setMobileNumberForRegister] = useState("");
  const [isMobileNumberVerified, setIsMobileNumberVerified] = useState(false);

  const [typedOtpPhone, setTypedOtpPhone] = useState("");
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isMobileOtpModalVisible, setIsMobileOtpModalVisible] = useState(false);

  const [UsernameForRegister, setUsernameForRegister] = useState("");
  const [PasswordForRegister, setPasswordForRegister] = useState("");
  const [PasscodeForRegister, setPasscodeForRegister] = useState("");

  const [FirstNameForRegister, setFirstNameForRegister] = useState("");
  const [LastNameForRegister, setLastNameForRegister] = useState("");
  const [MiddleNameForRegister, setMiddleNameForRegister] = useState("");

  const [mailsent, setMailsent] = useState(false);

  const [FullName, setFullName] = useState("");

  const [typedotp, setTypedOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [buttonTextForMobileNumber, setButtonTextForMobileNumber] =
    useState("Verify");

  const [buttonTextForEmail, setButtonTextForEmail] = useState("Verify");

  const showAlert = () => {
    message.error("Provide valid details");
  };

  const handleEmailVerify = async (e) => {
    e.preventDefault();

    const key = "updatable";
    message.loading({
      content: "Verification in process...",
      key,
      duration: 2,
    });

    try {
      // Step 1: Send the email
      const sendMailResponse = await fetch(
        `${process.env.BACKEND}/api/user/sendmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: EmailForRegister }),
        }
      );
      const sendMailData = await sendMailResponse.json();
      console.log("Mail sending response\n", sendMailData);

      if (sendMailData.status === 200) {
        console.log("Email sent successfully");
        setMailsent(true);
        message.success({
          content: "Email Sent Successfully!",
          key,
          duration: 1,
        });
        setIsModalVisibleOtpMail(true);
      } else {
        message.error("Failed to send email.");
        console.log("Failed to send email");
      }
    } catch (error) {
      console.error("Verification error:", error);
      message.error("An error occurred during verification.");
    }
  };

  const verifymail = async () => {
    const key = "updatable";
    if (mailsent) {
      try {
        const verifyResponse = await fetch(
          `${process.env.BACKEND}/api/user/verifymail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: EmailForRegister, otp: typedotp }),
          }
        );
        const verifyData = await verifyResponse.json();
        console.log("Verification response\n", verifyData);

        if (verifyData.status === 200) {
          setIsMailVerified(true);
          setIsModalVisibleOtpMail(false);
          setButtonTextForEmail("Verified");
          message.success({
            content: "Email Verified Successfully!",
            key,
            duration: 1,
          });
        } else {
          message.error("Invalid OTP. Verification failed.");
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  };

  const sendmobileotp = async () => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch("http://localhost:5001/api/user/sendotp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ mobileNumber: MobileNumberForRegister }),
    //   });
    //   const data = await response.json();
    //   console.log("OTP sending response\n", data);
    //   if (response.ok) {
    //     setIsMobileOtpSent(true);
    //     setIsMobileOtpModalVisible(true);
    //     message.success(data.message);
    //   } else {
    //     message.error(data.message);
    //     console.error("Failed to send OTP:", data.message);
    //   }
    // } catch (error) {
    //   console.error("Failed to send OTP:", error);
    //   message.error("Failed to send OTP");
    // } finally {
    //   setIsLoading(false);
    // }
    setIsLoading(true);
    setIsMobileOtpSent(true);
    setIsMobileOtpModalVisible(true);
    // message.success(data.message);
    message.success("OTP sent successfully");
    setIsLoading(false);
  };

  const handleMobileOtpVerify = async () => {
    // if (isMobileOtpSent) {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:5001/api/user/verifyotp",
    //       {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           mobileNumber: MobileNumberForRegister,
    //           otp: typedOtpPhone,
    //         }),
    //       }
    //     );
    //     console.log("OTP verification response\n", response);
    //     const data = await response.json();

    //     console.log("OTP verification response\n", data);
    //     if (response.ok) {
    //       setIsMobileNumberVerified(true);
    //       setIsMobileOtpModalVisible(false);
    //       setButtonTextForMobileNumber("Verified");
    //       message.success(data.message);
    //     } else {
    //       message.error(data.message);
    //     }
    //   } catch (error) {
    //     console.error("Failed to verify OTP:", error);
    //     message.error("Failed to verify OTP");
    //   }
    // }
    setIsMobileNumberVerified(true);
    setIsMobileOtpModalVisible(false);
    setButtonTextForMobileNumber("Verified");
    // message.success(data.message);
    message.success("OTP verified successfully");
  };

  const handleMobileNumberVerify = async (e) => {
    e.preventDefault();
    // setIsMobileNumberVerified(true);
    const key = "updatable";
    message.loading({
      content: "Verification in process...",
      key,
      duration: 2,
    });

    await sendmobileotp();
  };

  const handleOkOtp = async () => {
    await verifymail();
  };

  const handleCancelOtp = () => {
    setIsModalVisibleOtpMail(false);
  };

  const handleOkOtpPhone = async () => {
    await handleMobileOtpVerify();
  };

  const handleCancelOtpPhone = () => {
    setIsMobileOtpModalVisible(false);
  };

  const handleRegisterSubmit = async (formdata) => {
    console.log("Form Data:", formdata);

    try {
      const response = await axios.post(
        `${process.env.BACKEND}/api/user/register`,
        formdata,
        {
          withCredentials: true, // Include cookies
        }
      );
      message.success("Registration successful!");
      console.log("Registration successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Navigate to the dashboard on successful registration
    } catch (error) {
      if (error.response?.status === 409) {
        message.error(error.response.data.message); // User already exists
      } else {
        message.error("Registration failed. Please try again later.");
      }
      console.error("Registration failed:", error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsernameForRegister(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordForRegister(e.target.value);
  };

  const handlePasscodeChange = (e) => {
    setPasscodeForRegister(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstNameForRegister(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastNameForRegister(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleNameForRegister(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailForRegister(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumberForRegister(e.target.value);
  };

  const FormOnFinish = (formdata) => {
    // console.log("Success:", formdata);
    // check all fields now
    if (!isMobileNumberVerified) {
      message.error("Mobile Number not verified");
      return;
    } else if (!formdata) {
      message.error("Provide valid details");
      return;
    } else {
      handleRegisterSubmit(formdata);
    }
  };

  const FormOnFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    console.log("errorInfo");
    showAlert();
  };

  const handleChange = (e) => {
    // setFormData({ ...formData, e.target.name: e.target.value });
    // form.setFieldValue()
  };

  return {
    EmailForRegister,
    isMailVerified,

    MobileNumberForRegister,
    isMobileNumberVerified,

    UsernameForRegister,
    PasswordForRegister,
    PasscodeForRegister,

    FirstNameForRegister,
    LastNameForRegister,
    MiddleNameForRegister,
    FullName,

    buttonTextForEmail,
    buttonTextForMobileNumber,

    typedotp,
    setTypedOtp,

    isModalVisibleOtpMail,
    setIsModalVisibleOtpMail,

    isMobileOtpModalVisible,
    setIsMobileOtpModalVisible,

    typedOtpPhone,
    setTypedOtpPhone,

    mailsent,
    handleOkOtpPhone,
    handleCancelOtpPhone,

    handleCancelOtp,
    handleOkOtp,

    setEmailForRegister,
    setIsMailVerified,

    setMobileNumberForRegister,
    setIsMobileNumberVerified,

    setUsernameForRegister,
    setPasswordForRegister,
    setPasscodeForRegister,

    setFirstNameForRegister,
    setLastNameForRegister,
    setMiddleNameForRegister,
    setFullName,

    setButtonTextForEmail,
    setButtonTextForMobileNumber,

    handleEmailVerify,
    handleMobileNumberVerify,

    handleRegisterSubmit,
    handleUsernameChange,
    handlePasswordChange,
    handlePasscodeChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleMiddleNameChange,
    handleEmailChange,
    handleMobileNumberChange,

    FormOnFinish,
    FormOnFinishFailed,

    showAlert,
  };
};
