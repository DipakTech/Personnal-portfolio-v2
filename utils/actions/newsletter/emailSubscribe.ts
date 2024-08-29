"use server";
import WelcomeEmailTemplate from "@/emails/welcome-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function emailSubscribe(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Hello, <hello@dipakgiri12.com.np>",
      to: [email],
      subject: "Welcome email",
      react: WelcomeEmailTemplate({
        email,
      }),
    });

    if (error) return error;

    return data;
  } catch (error) {
    return error;
  }
}
