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
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
      <div className="space-y-6 rounded-2xl border border-stone-200 bg-[#FFFCF7] p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput name="fullName" label="ФИО" placeholder="Фамилия" />
          <FormInput
            name="phone"
            label="Номер телефона"
            type="tel"
            placeholder="+7 707 123 45 67"
          />
          <FormInput
            name="email"
            label="Email"
            disabled={true}
            type="email"
            placeholder="Email"
          />
          <FormInput
            name="address"
            label="Адрес"
            placeholder="Ваш адрес"
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            name="password"
            label="Новый пароль"
            placeholder="Введите новый пароль"
            type="password"
          />
          <FormInput
            name="confirmPassword"
            label="Подтвердите пароль"
            placeholder="Повторите пароль"
            type="password"
          />
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-stone-500">
            Сохраняйте изменения, чтобы обновить информацию профиля.
          </p>
          <Button
            disabled={
              !isChanged ||
              !form.formState.isValid ||
              form.formState.isSubmitting
            }
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800"
          >
            {loading ? "Сохраняем..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
