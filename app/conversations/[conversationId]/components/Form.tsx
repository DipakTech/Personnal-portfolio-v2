"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import useConversation from "@/hooks/useConversation";
import { EmojiPicker } from "../../components/emoji-picker";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: false });
    axios.post(`/api/chat/messages`, {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/chat/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const insertEmoji = (emoji: string) => {
    const currentMessage = getValues("message");
    const cursorPosition = currentMessage.length; // You can adjust this to get the actual cursor position if needed
    const newMessage =
      currentMessage.slice(0, cursorPosition) +
      emoji +
      currentMessage.slice(cursorPosition);
    setValue("message", newMessage);
  };

  return (
    <div className="py-4 px-4 bg-white dark:bg-[#020817] border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadWidget
        uploadPreset="vpnoelmn"
        options={{
          sources: ["local", "url", "unsplash", "camera"],
          multiple: true,
          maxFiles: 5,
        }}
        onSuccess={(result, { widget }) => {
          handleUpload(result);
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <HiPhoto
              size={30}
              className="text-cyan-500"
              onClick={() => open()}
            />
          );
        }}
      </CldUploadWidget>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message..."
        />
        <div className="flex gap-2 items-center ">
          <EmojiPicker
            onChange={(value) => {
              insertEmoji(value);
            }}
          />
          <button
            type="submit"
            className="rounded-full p-2 bg-cyan-500 cursor-pointer hover:bg-cyan-600 transition"
          >
            <HiPaperAirplane size={20} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
