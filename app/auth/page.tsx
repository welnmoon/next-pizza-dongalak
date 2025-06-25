"use client";

import LoginForm from "@/components/Modals/authModal/login-form";
import RegisterForm from "@/components/Modals/authModal/register-form";
import { useState } from "react";

const AuthPage = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const handleAuthTypeChange = () => {
    setAuthType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  const redirectToMainPage = () => {
    window.location.href = "/";
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

export default AuthPage;
