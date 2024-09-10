import axios from "axios";

export const getQuoteOfDay = async ({
  company,
  position,
  description,
  cv,
}: {
  company: string;
  position: string;
  description: string;
  cv: string;
}) => {
  try {
    const { data } = await axios.post(
      "https://worker-getting-started.dipakgiri-dev.workers.dev/ai",
      {
        company,
        position,
        description,
        cv,
      },
    );
    return data;
  } catch (error) {
    console.log("Error in getQuoteOfDay", error);
  }
};
