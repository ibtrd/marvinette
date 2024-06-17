import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/oauth/login";
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with 42</button>
    </div>
  );
}

export default Login;
