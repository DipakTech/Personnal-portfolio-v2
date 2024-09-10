import { queryClient } from "@/app/(dashboardlayout)/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteCoverLetter = () => {
  const mutation = useMutation<any, unknown, { id: string }, unknown>({
    mutationFn: async ({ id }) => {
      return await axios.delete(`/api/coverLetter/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coverLetters"],
      });
    },
  });

  return mutation;
};

export default useDeleteCoverLetter;
