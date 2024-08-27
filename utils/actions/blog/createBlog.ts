import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createBlog = async (data: FieldValues) => {
  await axios.post("/api/blog", data);
};
