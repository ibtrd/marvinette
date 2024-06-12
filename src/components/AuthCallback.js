import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { oauthConfig } from "../config";

function AuthCallback() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      const { clientId, clientSecret, redirectUri, tokenEndpoint } =
        oauthConfig;

      axios
        .post(tokenEndpoint, {
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        })
        .then((response) => {
          const accessToken = response.data.access_token;
          console.log("Access Token:", accessToken);
          // Store the access token and use it to make authenticated requests
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [location.search]);

  return <div>Authenticating...</div>;
}

export default AuthCallback;
