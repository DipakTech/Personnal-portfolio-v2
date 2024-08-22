import { cookies } from "next/headers";
import { ChatLayout } from "./components/chat/chat-layout";
import getConversations from "@/utils/actions/getConversations";
import getUsers from "@/utils/actions/getUsers";

export default async function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <ChatLayout
          users={users}
          initialConversations={conversations}
          defaultLayout={defaultLayout}
          navCollapsedSize={8}
        />
      </div>
    </main>
  );
}
