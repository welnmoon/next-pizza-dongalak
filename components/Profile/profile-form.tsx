import { useFormContext } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { ProfileSchemaType } from "./profileSchema";
import { Button } from "../ui/button";

interface Props {
  onSubmit: (data: ProfileSchemaType) => Promise<void>;
  loading: boolean;
  isChanged: boolean;
}

const ProfileForm = ({ onSubmit, isChanged, loading }: Props) => {
  const form = useFormContext<ProfileSchemaType>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 mt-10" style={{ width: "400px" }}>
        <FormInput name="fullName" label="ФИО" placeholder="Фамилия" />
        <FormInput
          name="phone"
          label="Номер телефона"
          disabled={true}
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Номер телефона"
        />
        <FormInput
          name="email"
          label="Email"
          disabled={true}
          type="email"
          placeholder="Email"
        />
        {/*TODO - Нужно сделать верификацию номера*/}
        <FormInput
          name="address"
          label="Адрес"
          placeholder="Ваш адрес"
          type="address"
        />
        <FormInput name="password" label="Пароль" placeholder="Новый пароль" />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          placeholder="87071234567"
        />
        <Button
          disabled={
            !isChanged || !form.formState.isValid || form.formState.isSubmitting
          }
          type="submit"
          className="bg-orange-500 hover:bg-orange-600"
        >
          {loading ? "Сохраняем..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
