"use client";

import { useState } from "react";
import LoginForm from "../Modals/authModal/login-form";
import RegisterForm from "../Modals/authModal/register-form";
import { useRouter } from "next/navigation";

const AuthClient = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const handleAuthTypeChange = () => {
    setAuthType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  const redirectToMainPage = () => {
    router.push("/home");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {authType === "login" ? (
          <LoginForm
            setOpen={redirectToMainPage}
            handleAuthTypeChange={handleAuthTypeChange}
            callbackUrl="/home"
          />
        ) : (
          <RegisterForm handleAuthTypeChange={handleAuthTypeChange} />
        )}
      </div>
    </div>
  );
};

export default AuthClient;
