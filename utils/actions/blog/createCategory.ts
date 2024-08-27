import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createCategory = async (data: FieldValues) => {
  await axios.post("/api/category", data);
};
