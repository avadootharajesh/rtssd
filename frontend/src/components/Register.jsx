import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, message, Modal } from "antd";

// Noty and Swal tested for message box - alert

import "../styles/Register.css";
import "antd/dist/reset.css";

import Loading from "../Utils/Loading";
import FormItem from "antd/es/form/FormItem";

import { RegisterUtil } from "../Utils/Register";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // form.setFieldValue("EmailForRegister", EmailForRegister);

  // states
  const [componentVariant, setComponentVariant] = React.useState("filled");
  const [loading, setLoading] = React.useState(false);

  const {
    EmailForRegister,
    setEmailForRegister,

    MobileNumberForRegister,
    setMobileNumberForRegister,

    UsernameForRegister,
    setUsernameForRegister,

    PasswordForRegister,
    setPasswordForRegister,

    PasscodeForRegister,
    setPasscodeForRegister,

    FirstNameForRegister,
    setFirstNameForRegister,

    LastNameForRegister,
    setLastNameForRegister,

    MiddleNameForRegister,
    setMiddleNameForRegister,

    FullName,
    setFullName,

    isMailVerified,
    setIsMailVerified,

    isMobileNumberVerified,
    setIsMobileNumberVerified,

    buttonTextForMobileNumber,
    setButtonTextForMobileNumber,

    buttonTextForEmail,
    setButtonTextForEmail,

    isLoading,
    setIsLoading,

    typedotp,
    setTypedOtp,

    isModalVisibleOtpMail,
    setIsModalVisibleOtpMail,

    isMobileOtpModalVisible,
    setIsMobileOtpModalVisible,

    typedOtpPhone,
    setTypedOtpPhone,

    handleCancelOtpPhone,
    handleOkOtpPhone,

    handleCancelOtp,
    handleOkOtp,

    handleEmailVerify,
    handleMobileNumberVerify,

    handleRegisterSubmit,
    FormOnFinish,
    FormOnFinishFailed,

    showAlert,

    handleEmailChange,
    handleMobileNumberChange,
    handleUsernameChange,
    handlePasswordChange,
    handlePasscodeChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleMiddleNameChange,
  } = RegisterUtil();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <div className="register-container">
      <h1 className="register-heading">Register</h1>
      <div className="register-form-div">
        <Form
          className="register-form"
          {...layout}
          name="basic"
          autoComplete="on"
          variant={componentVariant}
          initialValues={{ remember: true }}
          onFinish={FormOnFinish}
          onFinishFailed={FormOnFinishFailed}
          form={form}
        >
          <div className="names-of-the-person-div">
            {/* First Name */}
            <Form.Item
              label="First Name"
              name="firstName"
              className="firstnameinputregister registername"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Middle Name (Optional) */}
            <Form.Item
              label="Middle Name"
              className="middlenameinputregister registername"
              name="middleName"
            >
              <Input />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              label="Last Name"
              name="lastName"
              className="lastnameinputregister registername"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="mail-div-register" style={{
            display: "flex",
            gap: "2vw"
          }}>
            <Form.Item
              label="Email"
              name="email"
              className="emailinputregister"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                value={EmailForRegister}
                onChange={(e) => handleEmailChange(e)}
                // disabled={isMailVerified}
              />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              className="mobilenumberinputregister"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number!",
                },
              ]}
            >
              <Input
                placeholder="Enter your mobile number"
                value={MobileNumberForRegister}
                onChange={(e) => handleMobileNumberChange(e)}
                maxLength={10} // Limit input to 10 digits\
                disabled={isMobileNumberVerified}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type={isMobileNumberVerified ? "default" : "primary"}
                htmlType="submit"
                onClick={handleMobileNumberVerify}
                loading={loading}
                disabled={isMobileNumberVerified}
              >
                {buttonTextForMobileNumber}
              </Button>
            </Form.Item>
          </div>

          <Modal
            title="Enter OTP"
            open={isMobileOtpModalVisible}
            onOk={handleOkOtpPhone}
            onCancel={handleCancelOtpPhone}
            okText="Verify"
            cancelText="Cancel"
          >
            <Input
              placeholder="Enter OTP"
              value={typedOtpPhone}
              onChange={(e) => setTypedOtpPhone(e.target.value)}
              maxLength={6}
            />
          </Modal>

          <div className="username-div-register">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  min: 3,
                  message: "Username must be at least 3 characters!",
                },
                {
                  max: 15,
                  message: "Username cannot exceed 15 characters!",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only include letters, numbers, and underscores!",
                },
              ]}
            >
              <Input
                placeholder="Enter your username"
                value={UsernameForRegister}
                onChange={handleUsernameChange}
                maxLength={15} // Limit input to 15 characters
              />
            </Form.Item>
          </div>
          <div className="password-and-passcode-div-register">
            <Form.Item
              label="Password"
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
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                value={PasswordForRegister}
                onChange={handlePasswordChange}
              />
            </Form.Item>

            <Form.Item
              label="Passcode"
              name="passcode"
              rules={[
                {
                  required: true,
                  message: "Please input your passcode!",
                },
                {
                  len: 6,
                  message: "Passcode must be exactly 6 digits!",
                },
              ]}
            >
              <Input
                placeholder="Enter 6-digit passcode"
                value={PasscodeForRegister}
                onChange={handlePasscodeChange}
                maxLength={6} // Limit input to 6 characters
                type="tel" // Ensures numeric keyboard on mobile devices
              />
            </Form.Item>
          </div>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onSubmit={handleRegisterSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
