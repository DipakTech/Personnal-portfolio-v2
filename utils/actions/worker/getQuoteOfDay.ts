import axios from "axios";

export const getQuoteOfDay = async () => {
  try {
    const { data } = await axios.get(
      "https://worker-getting-started.dipakgiri-dev.workers.dev/api/quote",
    );
    return data;
  } catch (error) {
    console.log("Error in getQuoteOfDay", error);
  }
};
