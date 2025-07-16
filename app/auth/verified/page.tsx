import Link from "next/link";

const VerifiedPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        Ваш аккаунт успешно подтвержден!
      </h1>
      <p className="text-center mt-4">
        Теперь вы можете войти в свой аккаунт и начать пользоваться всеми
        функциями.
      </p>
      <div className="flex justify-center mt-6">
        <Link
          href="/home"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Перейти на главную страницу
        </Link>
      </div>
    </div>
  );
};

export default VerifiedPage;
