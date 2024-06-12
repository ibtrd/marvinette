import React from "react";
import { getAuthUrl } from "../utils/oauth";

function Login() {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with 42</button>
    </div>
  );
}

export default Login;
