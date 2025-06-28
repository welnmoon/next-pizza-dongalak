import Admin from "@/components/Admin/Admin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/home");
  }
  return <Admin />;
};

export default AdminPage;
