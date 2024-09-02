import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createBlog = async (data: FieldValues) => {
  console.log(data, "data...");
  await axios.post("/api/blog", data);
};
