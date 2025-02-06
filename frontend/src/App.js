// Basic import
import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

// Components import
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import TermsAndConditions from "./components/TermsAndConditions";
import DraggableCard from "./components/DraggableCard";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import Profile from "./components/Profile.jsx";

//mock
// import DSB from "./components/Mock/DSB";
import WSD from "./components/WS/WSD";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function HomePage() {
  return (
    <div className="homepage">
      <DraggableCard targetRoute="/about">About Us</DraggableCard>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="termsandconditions" element={<TermsAndConditions />} />
          <Route path="*" element={<Home />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/dsb" element={<DSB />} /> */}
          {/* <Route path="/wsd" element={<WSD />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
