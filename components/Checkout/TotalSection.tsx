import TotalPriceLineItem from "./total-price-line-item";

interface Props {
  itemsPriceWithTax: number;
  totalPrice: number;
}

const TotalSection = ({ itemsPriceWithTax, totalPrice }: Props) => {
  const tax = itemsPriceWithTax - totalPrice;
  return (
    <div className="bg-white rounded-md w-[450px]">
      <div className="p-4">
        <h3>Итого</h3>
        <h2>{totalPrice + itemsPriceWithTax}</h2>
      </div>

      <hr className="bg-gray-300 w-full" />

      <div className="p-4">
        <TotalPriceLineItem title="Стоимость товаров" price={totalPrice} />
        <TotalPriceLineItem title="Налоги" price={tax} />
      </div>
    </div>
  );
};

export default TotalSection;
