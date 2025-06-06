import Checkout from "@/components/Checkout/Checkout";
import PersonalInfo from "@/components/Checkout/PersonalInfo";
import TotalSection from "@/components/Checkout/TotalSection";

const CheckoutPage = () => {
  return (
    <div>
      <h1 className="text-[32px] font-bold">Оформление заказа</h1>

      <Checkout />
    </div>
  );
};

export default CheckoutPage;
