import Link from "next/link";

const NotAuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-1/4 bg-gray-100 p-4 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Вы не авторизованы</h1>
      <p className="text-gray-600 mb-6">
        Пожалуйста, войдите в свою учетную запись, чтобы продолжить.
      </p>
      <Link href="/auth" className="text-blue-500 hover:underline">
        Войти
      </Link>
    </div>
  );
};

export default NotAuthPage;
