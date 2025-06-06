"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Title3 from "./Title3";

interface Props {}

const PersonalInfo = ({}: Props) => {
  return (
    <div className="bg-white rounded-md w-full">
      <div className="p-4">
        <Title3 title="2. Персональная информация" />
      </div>
      <hr className="w-full" />
      {/*Main*/}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="">
          <Label className="font-bold">Имя</Label>
          <Input type="text" placeholder="Имя" />
        </div>
        <div className="">
          <Label>Фамилия</Label>
          <Input type="text" placeholder="Фамилия" />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label>Номер телефона</Label>
          <Input type="number" placeholder="Номер телефона" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
