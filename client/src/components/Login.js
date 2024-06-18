import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "/oauth/login";
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with 42</button>
    </div>
  );
}

export default Login;
