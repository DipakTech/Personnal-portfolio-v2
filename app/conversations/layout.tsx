import getConversations from "@/utils/actions/getConversations";
import ConversationList from "./components/ConversationList";
import { Metadata } from "next";
import getUsers from "@/utils/actions/getUsers";
import Sidebar from "./[conversationId]/components/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "My Conversations | Your Ultimate Chat Experience",
};

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  console.log("conversations", conversations);
  console.log("users", users);

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
