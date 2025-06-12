import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import TotalPriceLineItem from "./total-price-line-item";

interface Props {
  itemsPriceWithTax: number;
  totalPrice: number;
  pending: boolean;
}

const TotalSection = ({
  itemsPriceWithTax,
  totalPrice,
  pending = false,
}: Props) => {
  const tax = itemsPriceWithTax - totalPrice;
  const delivery = totalPrice === 0 ? 0 : 1000; // фиксируем доставку под картинку

  const handleClick = async () => {
    
  };

  return (
    <div className="bg-white rounded-xl w-[450px] flex flex-col gap-6 px-6 py-6">
      {/* Итого */}
      <div>
        <h3 className="text-lg mb-1">Итого:</h3>
        <h2 className="text-3xl font-bold">{itemsPriceWithTax + delivery} ₸</h2>
      </div>

      {/* Список цен */}
      <div className="flex flex-col gap-3">
        <TotalPriceLineItem
          title="Стоимость товаров"
          price={totalPrice}
          showIcon={1}
        />
        <TotalPriceLineItem title="Налоги" price={tax} showIcon={2} />
        <TotalPriceLineItem title="Доставка" price={delivery} showIcon={3} />
      </div>

      <hr className="bg-gray-200 w-full" />

      {/* Промокод */}
      <div className="text-gray-400 text-sm">У меня есть промокод</div>

      {/* Кнопка */}
      <Button
        // type="submit"
        // onClick={handleClick}
        disabled={totalPrice === 0}
        className={`bg-orange-500 hover:bg-orange-600 flex h-12 rounded-full w-full `}
      >
        {pending ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        ) : (
          <span className="text-lg flex-1 text-center text-white">
            Перейти к оплате
          </span>
        )}
        <ChevronRight className="size-6 text-white" />
      </Button>
    </div>
  );
};

export default TotalSection;
