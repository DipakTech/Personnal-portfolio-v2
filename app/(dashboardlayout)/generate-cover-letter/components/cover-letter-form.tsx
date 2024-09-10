"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Textarea } from "@/components/ui/textarea";
import useGenerateCoverLetter from "@/hooks/mutation/useGenerateCoverLetter";
import usePostGeneratedCoverLetter from "@/hooks/mutation/usePostGeneratedCoverLetter";
import { useUser } from "@clerk/nextjs";

import { useState } from "react";

export function CoverLetterForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    cv: "",
  });
  const generateCoverLetterMutation = useGenerateCoverLetter();
  const postGeneratedCoverLetter = usePostGeneratedCoverLetter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await generateCoverLetterMutation.mutateAsync({
      ...formData,
      fullName: user?.fullName ?? "Dipak Giri",
    });

    // response.status === 200
    //   ? alert("Cover Letter Generated Successfully")
    //   : alert("Error in Generating Cover Letter");

    const coverLetter = await response.data.coverLetter.response;

    await postGeneratedCoverLetter.mutateAsync({
      ...formData,
      coverLetter,
    });
    setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <Input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleInputChange}
      />
      <Input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleInputChange}
      />
      <Textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleInputChange}
        className="min-h-[250px]"
      />
      <Textarea
        name="cv"
        placeholder="Your CV"
        value={formData.cv}
        onChange={handleInputChange}
        className="min-h-[250px]"
      />
      <LoadingButton
        loading={generateCoverLetterMutation.isPending}
        type="submit"
        className="w-full"
        disabled={generateCoverLetterMutation.isPending}
      >
        {generateCoverLetterMutation.isPending
          ? "Generating..."
          : "Generate Cover Letter"}
      </LoadingButton>
    </form>
  );
}
