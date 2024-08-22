"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

import useConversation from "@/hooks/useConversation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  // delete conversation
  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/chat/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        toast.success("Chat deleted!");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete chat">
      <div className="sm:flex sm:items-center">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Delete Conversation
          </h1>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this chat?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
