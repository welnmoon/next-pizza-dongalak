import React from "react";

interface Props {
  code: string;
  userId: string;
}

export const VerifyUserTemplate = ({ code, userId }: Props) => {
  const verifyUrl = `http://localhost:3000/api/auth/verify?code=${code}&userId=${userId}`;

  return (
    <div>
      <h1>Ваш код для подтверждения аккаунта {code}</h1>

      <p>
        Пожалуйста, перейдите по следующей <a href={verifyUrl}>ссылке</a>, чтобы
        подтвердить ваш аккаунт:
      </p>
    </div>
  );
};
