import { PayOrderEmailTemplate } from "@/components/email/pay-order";
import { Resend } from "resend";

export const sendEmail = async (
  to: string,
  subject: string,
  orderId: number,
  totalAmount: number,
  paymentUrl: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Next Pizza <onboarding@resend.dev>",
    to,
    subject,
    react: PayOrderEmailTemplate({ orderId, totalAmount, paymentUrl }),
  });

  if (error) throw Error(`[sendEmail] error: ${error.message}`);

  return data;
};
