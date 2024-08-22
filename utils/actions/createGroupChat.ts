import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createGroupChat = async (data: FieldValues) => {
  await axios.post("/api/chat/conversations", { ...data, isGroup: true });

  // .then(() => {
  //   router.refresh();
  //   onClose();
  //   toast.success("Group chat created!");
  //   router.push(`/conversations`);
  // })
  // .catch((err) => toast.error(err.message || "Something went wrong!"))
  // .finally(() => setIsLoading(false));
};
