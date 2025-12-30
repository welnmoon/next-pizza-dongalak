import Checkout from "@/components/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div className="pb-10 sm:pb-16">
      <h1 className="text-2xl sm:text-[32px] font-bold mb-6">
        Оформление заказа
      </h1>

      <Checkout />
    </div>
  );
};

export default CheckoutPage;
