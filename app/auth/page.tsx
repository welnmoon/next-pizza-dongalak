import AuthClient from "@/components/Auth/Auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return <AuthClient />;
};

export default AuthPage;
