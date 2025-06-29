import Title3 from "./Title3";
import FormInput from "./Form/FormInput";

const PersonalInfo = () => {
  return (
    <div className="bg-white rounded-md w-full">
      <div className="p-4">
        <Title3 title="2. Персональная информация" />
      </div>
      <hr className="w-full" />
      {/*Main*/}

      <div className="p-4 pb-10 pt-6 grid grid-cols-2 gap-x-4 gap-y-6">
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
