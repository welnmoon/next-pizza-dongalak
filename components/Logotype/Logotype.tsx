import Image from "next/image";
import Link from "next/link";

const Logotype = () => {
  return (
    <Link href="/">
      <div className="flex gap-2 items-center">
        <div className="text-black">
          <Image
            alt="Dongalak Logo"
            src={"/pizzaIcon.png"}
            width={40}
            height={40}
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl font-extrabold uppercase">
            Dongalak
          </h1>
          <p className="text-gray-600">вкусней уже некуда</p>
        </div>
      </div>
    </Link>
  );
};

export default Logotype;
