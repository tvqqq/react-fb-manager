import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-100 border-blue-300 text-blue-700
      hover:bg-blue-200 transition duration-200 ease-in-out
      p-2 w-24 mx-auto text-center text-base"
    >
      Log In
    </button>
  );
};

export default LoginButton;
