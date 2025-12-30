import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { UserSchemaType } from "./userSchema";

interface Props {
  onSubmit: (data: UserSchemaType) => Promise<void>;
  loading: boolean;
  isChanged: boolean;
}

const UserForm = ({ onSubmit, isChanged, loading }: Props) => {
  const form = useFormContext<UserSchemaType>();
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
        <label className="text-sm font-medium" htmlFor="role">
          Роль пользователя
        </label>
        <select
          id="role"
          {...form.register("role")}
          className="border border-stone-300 rounded px-3 py-2"
        >
          <option value="USER">Обычный пользователь</option>
          <option value="ADMIN">Администратор</option>
        </select>
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
          className="bg-emerald-700 hover:bg-emerald-800"
        >
          {loading ? "Сохраняем..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
