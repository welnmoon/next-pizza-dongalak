interface Props {
  price: number;
  title: string;
  showIcon: 1 | 2 | 3;
}

const TotalPriceLineItem = ({ price, title, showIcon }: Props) => {
  return (
    <div className="flex items-center gap-3 text-sm sm:text-base">
      {/* Иконка и текст */}
      <div className="flex items-center gap-2">
        <div className="w-4">
          {showIcon === 1 && (
            <img src="./Group.png" alt="" className="w-4 h-4" />
          )}
          {showIcon === 2 && (
            <img src="./Union.png" alt="" className="w-3 h-3" />
          )}
          {showIcon === 3 && (
            <img src="./Delivery.png" alt="" className="w-3 h-3" />
          )}
        </div>
        <p>{title}:</p>
      </div>

      {/* Линия — занимает всё оставшееся место */}
      <div className="flex-1 border-t border-dashed border-stone-300 mt-1" />

      {/* Цена */}
      <p className="font-bold">{price} ₸</p>
    </div>
  );
};

export default TotalPriceLineItem;
