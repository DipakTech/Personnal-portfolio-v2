"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const subscriberList = async () => {
  try {
    const emailList = await resend.contacts.list({
      //   id: "79543ddd-32b8-4172-990a-973d90152e5b",
      audienceId: "783375fc-5e02-4704-9e25-a6a8154e71df",
    });
    return emailList;
  } catch (error) {
    return [];
  }
};
