import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "./login-form";
import { useState } from "react";
import RegisterForm from "./register-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AuthModal = ({ open, setOpen }: Props) => {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const handleAuthTypeChange = () => {
    setAuthType((prevType) => (prevType === "login" ? "register" : "login"));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg ">
        <div className="flex flex-col items-center justify-center h-full">
          {authType === "login" && (
            <LoginForm
              setOpen={setOpen}
              handleAuthTypeChange={handleAuthTypeChange}
            />
          )}
          {authType === "register" && <RegisterForm handleAuthTypeChange={handleAuthTypeChange}/>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
