import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="bg-red-100 border-red-300 text-red-700 
      hover:bg-red-200 transition duration-200 ease-in-out
      p-2 w-24 mx-auto text-center text-base"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
