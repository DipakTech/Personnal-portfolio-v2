import axios from "axios";

export const getRandomQuote = async () => {
  try {
    const { data } = await axios.get(
      "https://worker-getting-started.dipakgiri-dev.workers.dev/api/random",
    );
    return data;
  } catch (error) {
    console.log("Error in getRandomQuote", error);
  }
};
