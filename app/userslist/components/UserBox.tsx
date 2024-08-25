"use client";

import Avatar from "@/app/conversations/[conversationId]/components/components/Avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  user: User;
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/chat/conversations", {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, router]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div
        title="Start a chat"
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white dark:bg-[#0F172A] p-3 hover:bg-neutral-100 rounded-md transition cursor-pointer"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserBox;
