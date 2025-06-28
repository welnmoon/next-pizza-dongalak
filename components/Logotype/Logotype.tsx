import Image from "next/image";
import Link from "next/link";

const Logotype = () => {
  return (
    <Link href="/home" className="hover:opacity-90 transition-opacity duration-200">
      <div className="flex items-center gap-3">
        <Image
          alt="Dongalak Logo"
          src="/pizzaIcon.png"
          width={48}
          height={48}
          className="rounded-full shadow-sm"
        />
        <div className="leading-tight">
          <h1 className="text-xl sm:text-2xl font-black uppercase text-black tracking-wide">
            DONGALAK
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            вкусней уже некуда
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logotype;
