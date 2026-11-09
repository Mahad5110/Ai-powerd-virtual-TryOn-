const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://backend-tau-one-55.vercel.app"
).replace(/\/+$/, "");

async function postAuth(path, body) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not connect to the server. Please try again.");
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(result.message || "Authentication failed. Please try again.");
  }

  return result;
}

export function signIn(email, password) {
  return postAuth("signin", { email, password });
}

export function signUp(name, email, password) {
  return postAuth("signup", { name, email, password });
}
