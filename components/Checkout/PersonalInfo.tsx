import Title3 from "./Title3";
import FormInput from "../Form/FormInput";

const PersonalInfo = () => {
  return (
    <div className="bg-[#FFFCF7] rounded-2xl border border-stone-200 w-full">
      <div className="p-3 sm:p-4">
        <Title3 title="2. Персональная информация" />
      </div>
      <hr className="w-full border-stone-200" />
      {/*Main*/}

      <div className="p-3 pb-8 pt-5 sm:p-4 sm:pb-10 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <FormInput name="name" label="Имя" required placeholder="Имя" />
        <FormInput
          name="lastName"
          label="Фамилия"
          required
          placeholder="Фамилия"
        />
        <FormInput
          name="email"
          label="Email"
          required
          placeholder="Email"
          type="email"
        />
        <FormInput
          name="number"
          label="Номер телефона"
          required
          placeholder="87071234567"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
