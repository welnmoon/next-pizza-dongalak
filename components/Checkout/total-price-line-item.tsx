interface Props {
  price: number;
  title: string;
}

const TotalPriceLineItem = ({ price, title }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {/* Иконка и текст */}
      <div className="flex items-center gap-1">
        <img src="./Group.png" alt="" className="w-4 h-4" />
        <p>{title}:</p>
      </div>

      {/* Линия — занимает всё оставшееся место */}
      <div className="flex-1 border-t border-dashed border-gray-300 mt-1" />

      {/* Цена */}
      <p>{price} ₸</p>
    </div>
  );
};

export default TotalPriceLineItem;
