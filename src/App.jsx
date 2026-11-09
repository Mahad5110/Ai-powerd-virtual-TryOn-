
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import { getCurrentUser } from "./api";
import { getProductById } from "./data/products";

export default function App() {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState(() => localStorage.getItem("tryfirst_token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tryfirst_user") || "null");
    } catch {
      localStorage.removeItem("tryfirst_user");
      return null;
    }
  });

  useEffect(() => {
    if (!token) return undefined;

    let active = true;

    getCurrentUser(token)
      .then(({ user: currentUser }) => {
        if (!active) return;
        localStorage.setItem("tryfirst_user", JSON.stringify(currentUser));
        setUser(currentUser);
      })
      .catch((error) => {
        if (!active) return;

        if (error.status === 401) {
          localStorage.removeItem("tryfirst_token");
          localStorage.removeItem("tryfirst_user");
          setToken(null);
          setUser(null);
          return;
        }

        console.error("Could not restore the signed-in profile:", error);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const handleAuthentication = (session) => {
    localStorage.setItem("tryfirst_token", session.token);
    localStorage.setItem("tryfirst_user", JSON.stringify(session.user));
    setToken(session.token);
    setUser(session.user);
    setPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("tryfirst_token");
    localStorage.removeItem("tryfirst_user");
    setToken(null);
    setUser(null);
    setPage("home");
  };

  const pathname = window.location.pathname;
  const resetToken = new URLSearchParams(window.location.search).get("token");

  const productMatch = pathname.match(
    /^\/products\/([^/]+)\/?$/
  );

  if (pathname === "/reset-password" || pathname === "/reset-password/") {
    return (
      <ResetPassword
        token={resetToken}
        onBackToLogin={() => {
          window.history.replaceState(null, "", "/");
          setPage("login");
        }}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onShowLogin={() => setPage("login")}
        onSignup={handleAuthentication}
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
        onLogin={handleAuthentication}
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
        user={user}
        onLogout={handleLogout}
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
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Home
      onLogin={() => setPage("login")}
      onSignup={() => setPage("signup")}
      user={user}
      onLogout={handleLogout}
    />
  );
}
