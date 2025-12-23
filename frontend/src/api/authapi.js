const BASE_URL = "http://localhost:5000/api/auth";

/* ================= USER SIGNUP ================= */
export const signupApi = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result; // { message, user }
};

/* ================= USER LOGIN ================= */
export const loginApi = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  console.log("LOGIN API RESPONSE 👉", result); // 🔴 DEBUG (IMPORTANT)

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  // ✅ ENSURE TOKEN EXISTS
  if (!result.token) {
    throw new Error("Token not received from server");
  }

  return result; // { token }
};
