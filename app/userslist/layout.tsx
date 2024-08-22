import { Metadata } from "next";
import UserList from "./components/UserList";
import getUsers from "@/utils/actions/getUsers";
import Sidebar from "../conversations/[conversationId]/components/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "All Users | Nexus - Your Ultimate Chat Experience",
};

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className=" h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
