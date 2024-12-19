"use server";

import WelcomeEmailTemplate from "@/emails/welcome-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function emailSubscribe(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Dipak Giri, <hello@oneclickresult.com>",
      to: [email],
      subject: "Welcome email",
      react: WelcomeEmailTemplate({
        email,
      }),
    });

    await resend.contacts.create({
      email: email,
      firstName: email.split("@")[0],
      lastName: "",
      unsubscribed: false,
      audienceId: "783375fc-5e02-4704-9e25-a6a8154e71df",
    });

    if (error) return error;

    return data;
  } catch (error) {
    return error;
  }
}
