import { queryClient } from "@/app/(dashboardlayout)/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostGeneratedCoverLetter = () => {
  const mutation = useMutation<
    any,
    unknown,
    {
      company: string;
      position: string;
      description: string;
      cv: string;
      coverLetter: string;
    },
    unknown
  >({
    mutationFn: async ({ company, position, description, cv, coverLetter }) => {
      return await axios.post("/api/coverLetter", {
        company,
        position,
        description,
        cv,
        coverLetter,
      });
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ["coverLetters"],
      });
    },
  });
  return mutation;
};

export default usePostGeneratedCoverLetter;
