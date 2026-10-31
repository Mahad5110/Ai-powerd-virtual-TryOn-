
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [page, setPage] = useState("home");

  const handleLogin = () => {
    alert("Login form validated. Real authentication will be added later.");
  };

  const handleSignup = () => {
    alert("Sign Up form validated. Account storage will be added later.");
    setPage("login");
  };

  if (page === "home") {
    return (
      <Home
        onLogin={() => setPage("login")}
        onSignup={() => setPage("signup")}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onShowLogin={() => setPage("login")}
        onSignup={handleSignup}
      />
    );
  }

  if (page === "forgot") {
    return (
      <ForgotPassword
        onBackToLogin={() => setPage("login")}
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onShowSignup={() => setPage("signup")}
      onForgotPassword={() => setPage("forgot")}
    />
  );
}
