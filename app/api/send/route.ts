import WelcomeEmailTemplate from "@/emails/welcome-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Hello, <hello@dipakgiri12.com.np>",
      to: ["dipakgiri.dev@gmail.com"],
      subject: "Welcome,email",
      react: WelcomeEmailTemplate({ firstName: "Dipak Giri" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
