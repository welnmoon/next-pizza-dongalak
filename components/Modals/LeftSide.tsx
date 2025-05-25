import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";

interface Props {
  selectedSize: number;
  product: Product;
}

const LeftSide = ({ selectedSize, product }: Props) => {
  return (
    <div className="w-full md:w-1/2 h-[300px] md:h-[360px] flex justify-center items-center bg-white p-8 relative">
      {/* Круглая рамка для большой пиццы*/}
      {selectedSize !== 40 && (
        <div
          className="absolute w-[280px] h-[280px] rounded-full border-[2px] border-dashed border-gray-200 z-0 translate-x-[-6px] translate-y-[-4px]            
            "
        />
      )}

      {/* Круглая рамка для средней пиццы*/}
      {selectedSize !== 30 && selectedSize !== 40 && (
        <div className="absolute w-[240px] h-[240px] rounded-full border-[2px] border-dotted border-gray-200 z-0 translate-x-[-6px] translate-y-[-4px]" />
      )}

      {/* Картинка пиццы */}
      <div
        className={cn(
          "relative aspect-square z-10 transition-all duration-300 ease-in-out max-w-full",
          selectedSize === 20
            ? "w-[220px]"
            : selectedSize === 30
            ? "w-[260px]"
            : selectedSize === 40
            ? "w-[300px]"
            : ""
        )}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LeftSide;
