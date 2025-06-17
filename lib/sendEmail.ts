import { Resend } from "resend";
import { ReactElement } from "react";

export const sendEmail = async (
  to: string,
  subject: string,
  reactComponent: ReactElement
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Next Pizza <onboarding@resend.dev>",
    to,
    subject,
    react: reactComponent,
  });

  if (error) throw new Error(`[sendEmail] error: ${error.message}`);

  return data;
};
