
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import { getProductById } from "./data/products";

export default function App() {
  const [page, setPage] = useState("home");

  // Successful login takes the user to homepage
  const handleLogin = () => {
    setPage("home");
  };

  const handleSignup = () => {
    alert("Sign Up form validated. Account storage will be added later.");
    setPage("login");
  };

  const pathname = window.location.pathname;

  const productMatch = pathname.match(
    /^\/products\/([^/]+)\/?$/
  );

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

  if (page === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onShowSignup={() => setPage("signup")}
        onForgotPassword={() => setPage("forgot")}
      />
    );
  }

  if (pathname === "/catalog" || pathname === "/catalog/") {
    const category = new URLSearchParams(
      window.location.search
    ).get("category");

    return (
      <Catalog
        initialCategory={
          category
            ? category[0].toUpperCase() + category.slice(1)
            : "All pieces"
        }
        onLogin={() => setPage("login")}
        onSignup={() => setPage("signup")}
      />
    );
  }

  if (productMatch) {
    return (
      <ProductDetails
        product={getProductById(
          decodeURIComponent(productMatch[1])
        )}
        onLogin={() => setPage("login")}
        onSignup={() => setPage("signup")}
      />
    );
  }

  return (
    <Home
      onLogin={() => setPage("login")}
      onSignup={() => setPage("signup")}
    />
  );
}
