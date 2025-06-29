import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Admin from "@/components/Admin/Admin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/home"); // TODO - нужно создать страницу типа (Хочешь войти в админку? Устройся к нам на работу!)
  }
  return <Admin />;
};

export default AdminPage;
