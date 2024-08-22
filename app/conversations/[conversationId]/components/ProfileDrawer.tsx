"use client";

import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { useMemo, Fragment, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal";
import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/hooks/useActiveList";
import Avatar from "./components/Avatar";
import AvatarGroup from "./components/AvatarGroup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(data.createdAt), "PP");
  }, [data.createdAt]);

  const title = useMemo(() => {
    if (data.isGroup) {
      return data.name;
    }

    return otherUser?.name || otherUser?.email;
  }, [data.isGroup, data.name, otherUser?.email, otherUser?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <div className="flex h-full flex-col  py-6 shadow-xl">
            <div className="relative mt-6 flex-1 px-4 sm:px-6">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  {data.isGroup ? (
                    <AvatarGroup users={data.users} />
                  ) : (
                    <Avatar user={otherUser} />
                  )}
                </div>

                <div>{title}</div>

                <div className="text-sm text-gray-500">{statusText}</div>

                <div className="flex gap-10 my-8">
                  <div
                    onClick={() => setIsConfirmModalOpen(true)}
                    title="Delete Chat"
                    className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                  >
                    <div className="w-10 h-10 border  rounded-full flex items-center justify-center">
                      <IoTrash size={20} />
                    </div>
                    <div className="text-sm font-light text-red-600">
                      Delete
                    </div>
                  </div>
                </div>

                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                  <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                    {data.isGroup ? (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                          Members
                        </dt>
                        <dd className="mt-1 font-medium text-sm text-gray-100 sm:col-span-2">
                          {data.users
                            .map((user) => user.name || user.email)
                            .join(", ")}
                        </dd>
                      </div>
                    ) : (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                          Email
                        </dt>
                        <dd className="mt-1 font-medium text-sm text-gray-100 sm:col-span-2">
                          {otherUser?.email}
                        </dd>
                      </div>
                    )}

                    {data.isGroup ? (
                      <>
                        <hr />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Created
                          </dt>
                          <dd className="mt-1 font-medium text-sm text-gray-900 sm:col-span-2">
                            <time dateTime={joinedDate}>{joinedDate}</time>
                          </dd>
                        </div>
                      </>
                    ) : (
                      <>
                        <hr />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Joined
                          </dt>
                          <dd className="mt-1 font-medium text-sm text-gray-100 sm:col-span-2">
                            <time dateTime={joinedDate}>{joinedDate}</time>
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default ProfileDrawer;
