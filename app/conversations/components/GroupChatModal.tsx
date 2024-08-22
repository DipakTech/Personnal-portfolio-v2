"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../[conversationId]/components/components/input/Input";
import Select from "../[conversationId]/components/components/input/Select";
import { createGroupChat } from "@/utils/actions/createGroupChat";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await createGroupChat(data);
      router.refresh();
      onClose();
      toast.success("Group chat created!");
      router.push(`/conversations`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a group chat"
      description="Create a group chat to chat with multiple people at once."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Group name"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
