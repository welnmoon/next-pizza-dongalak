"use client";

import { useState } from "react";
import LoginForm from "../Modals/authModal/login-form";
import RegisterForm from "../Modals/authModal/register-form";
import { redirect } from "next/navigation";

const AuthClient = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const handleAuthTypeChange = () => {
    setAuthType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  const redirectToMainPage = () => {
    redirect("/home");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {authType === "login" ? (
          <LoginForm
            setOpen={redirectToMainPage}
            handleAuthTypeChange={handleAuthTypeChange}
          />
        ) : (
          <RegisterForm handleAuthTypeChange={handleAuthTypeChange} />
        )}
      </div>
    </div>
  );
};

export default AuthClient;
