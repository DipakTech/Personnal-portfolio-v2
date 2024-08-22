"use client";

import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { FullMessageType } from "@/types";
import Avatar from "./components/Avatar";
import { useUser } from "@clerk/nextjs";

interface MessageBoxProps {
  isLast: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const { user } = useUser();
  const currentUser = user;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOwn = user?.emailAddresses[0].emailAddress === data.sender?.email;
  const seenList = (data.seen || [])
    .filter(
      (user) => user.email !== currentUser?.emailAddresses[0].emailAddress,
    )
    .map((user) => user.name)
    .join(", ");

  // dynamic classes
  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-cyan-500 text-white" : "bg-black",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender?.name || data.sender?.email}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        <div className={message}>
          <ImageModal
            isOpen={isImageModalOpen}
            src={data.image}
            onClose={() => setIsImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setIsImageModalOpen(true)}
              src={data.image}
              width={288}
              height={288}
              alt="image"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>

        {
          // show seen list if last message
          isLast && isOwn && seenList && (
            <div className="text-xs font-light text-gray-500">
              Seen by {seenList}
            </div>
          )
        }
      </div>
    </div>
  );
};
export default MessageBox;
