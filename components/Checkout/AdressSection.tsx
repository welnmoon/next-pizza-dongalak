import Title3 from "./Title3";
import FormInput from "./Form/FormInput";
import { placeHolderaddress } from "@/constants/constants";
import FormTextArea from "./Form/FormTextarea";

const AddressSection = () => {
  const address = placeHolderaddress({ city: "Алматы" });
  return (
    <div className="bg-white rounded-md w-full">
      <div className="p-4">
        <Title3 title="3. Адрес доставки" />
      </div>
      <hr className="w-full" />
      {/*Main*/}

      <div className="p-4 pb-10 pt-6 flex flex-col gap-6">
        <FormInput
          name="address"
          label="Введите адрес"
          required
          placeholder={address}
        />
        <FormTextArea
          name="comment"
          placeholder="Напиши что нибудь"
          label="Комментарий"
        />
      </div>
    </div>
  );
};

export default AddressSection;
