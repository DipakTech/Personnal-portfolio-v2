import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createNewUser } from "@/utils/actions/user/createNewUser";
import { Knock } from "@knocklabs/node";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const knockClient = new Knock(
    "sk_test_c4Wxoy5KobV7foF8n4nBNRcJ0gnVu55O2n28b9Naysw",
  );

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // console.log(email_addresses, "email address..");

    await createNewUser({
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    });

    await knockClient.workflows.trigger("new-user", {
      actor: {
        id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
      },
      recipients: ["user_2kdm8tDJ1IMir6gZm02lb72EmGn"],
      // data: {
      //   name: "Dipak Giri",
      //   email: "dipakgiri.dev@gmail.com",
      //   position: "software engineer",
      // },
    });

    // if (!id || !email_addresses) {
    //   return new Response('Error occurred -- missing data', {
    //     status: 400
    //   })
    // }

    // const user = {
    //   clerkUserId: id,
    //   email: email_addresses[0].email_address,
    //   ...(first_name ? { firstName: first_name } : {}),
    //   ...(last_name ? { lastName: last_name } : {}),
    //   ...(image_url ? { imageUrl: image_url } : {})
    // }

    // await createUser(user as User)
  }

  //   if (eventType === 'user.updated') {
  //     const { id, first_name, last_name, image_url } = evt.data

  //     if (!id) {
  //       return new Response('Error occurred -- missing data', {
  //         status: 400
  //       })
  //     }

  //     const data = {
  //       ...(first_name ? { firstName: first_name } : {}),
  //       ...(last_name ? { lastName: last_name } : {}),
  //       ...(image_url ? { imageUrl: image_url } : {})
  //     }

  //     await UpdateUser(id, data)
  //   }

  return new Response("", { status: 200 });
}