import { queryClient } from "@/app/(dashboardlayout)/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function generateCoverLetter(data: {
  company: string;
  position: string;
  description: string;
  cv: string;
}) {
  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${data.position} position at ${data.company}. 

${data.cv}

${data.description}

I am excited about the opportunity to bring my skills and experience to your team and contribute to your company's success.

Thank you for your consideration. I look forward to the opportunity to discuss how I can contribute to ${data.company}.

Sincerely,
[Your Name]`;
}

const useGenerateCoverLetter = () => {
  const mutation = useMutation<
    any,
    unknown,
    {
      company: string;
      position: string;
      description: string;
      cv: string;
      fullName: string;
    },
    unknown
  >({
    mutationFn: async ({ company, position, description, cv, fullName }) => {
      return await axios.post(
        "https://worker-getting-started.dipakgiri-dev.workers.dev/api/ai",
        {
          company,
          position,
          description,
          cv,
          fullName,
        },
      );
    },
  });
  return mutation;
};

export default useGenerateCoverLetter;
