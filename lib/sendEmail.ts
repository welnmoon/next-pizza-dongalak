import { Resend } from "resend";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "sultanelshatuly@gmail.com",
    to,
    subject,
    html, // ✅ передаёшь HTML-строку
  });

  if (error) throw Error("sendEmail error");

  return data;
};
