import Link from "next/link";

const AdminHeader = () => {
  return (
    <header>
      <div className="flex items-center gap-4 p-4 bg-stone-900 text-white">
        <div>
          <Link
            href={"/home"}
            className="text-1xl bg-stone-500 px-3 py-1 rounded-md cursor-pointer font-bold hover:bg-stone-700 duration-200"
          >
            Сайт
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Админ Панель</h1>
      </div>
    </header>
  );
};

export default AdminHeader;
