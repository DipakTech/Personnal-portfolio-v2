import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Type definitions for cover letters
interface CoverLetter {
  id?: string;
  company: string;
  position: string;
  description: string;
  cv: string;
  coverLetter: string;
}

// Mock data with cover letters
const mockCoverLetters: CoverLetter[] = [
  {
    company: "TechInnovate Solutions",
    position: "Senior Full Stack Developer",
    description: "Seeking an experienced developer...",
    cv: "10 years of experience in web development...",
    coverLetter:
      "Dear Hiring Manager at TechCorp Solutions,\n\nI am thrilled to apply for the Frontend Developer position at TechCorp Solutions, where I can leverage my expertise in React and modern web technologies to build responsive and user-friendly web applications. With a strong background in frontend development, I am confident that my skills and experience make me an ideal candidate for this role. As a passionate developer who stays up-to-date with the latest trends and best practices, I am excited about the opportunity to join a dynamic tech environment and contribute to the company's success.\n\nWith over 3 years of experience building responsive web applications, I possess a deep understanding of HTML5, CSS3, and JavaScript. My expertise in React has allowed me to create scalable and maintainable frontend architectures, optimizing web performance and ensuring seamless user experiences. For instance, in my previous role at XYZ Corporation, I built a React-based web application that increased user engagement by 30% through targeted UI improvements and performance enhancements.\n\nI am particularly drawn to TechCorp Solutions because of its commitment to innovation and customer satisfaction. As a company that values cutting-edge technology and collaboration, I am excited about the opportunity to work with a talented team of professionals who share my passion for web development. I am impressed by TechCorp Solutions' focus on delivering high-quality solutions that meet the evolving needs of its clients, and I am eager to contribute my skills and experience to the company's growth.\n\nWith my strong foundation in React and modern web technologies, I am confident that I can make a significant impact at TechCorp Solutions. My experience with state management libraries like Redux has allowed me to effectively manage application state and ensure scalability. I am excited about the opportunity to bring my skills and expertise to the company and contribute to the development of innovative web applications that meet the evolving needs of clients.\n\nThank you for considering my application. I am excited about the opportunity to discuss my qualifications further and learn more about the Frontend Developer role at TechCorp Solutions. Please feel free to contact me at your convenience.\n\nSincerely,\nDipak Giri",
  },
  {
    company: "DataDriven Inc.",
    position: "Data Scientist",
    description: "Looking for a data expert...",
    cv: "PhD in Computer Science with focus on ML...",
    coverLetter:
      "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Data Scientist position at DataDriven Inc. With my PhD in Computer Science focusing on Machine Learning, I am well-equipped to tackle the data challenges your company faces...\n\nBest regards,\nYour Name",
  },
  {
    company: "CloudNine Systems",
    position: "Cloud Architect",
    description: "Need a skilled cloud infrastructure expert...",
    cv: "Certified in AWS, Azure, and Google Cloud...",
    coverLetter:
      "Dear Hiring Manager,\n\nI am thrilled to apply for the Cloud Architect position at CloudNine Systems. As a certified expert in AWS, Azure, and Google Cloud, I bring a comprehensive understanding of cloud infrastructure that aligns perfectly with your needs...\n\nSincerely,\nYour Name",
  },
];

const useGetAllCoverLetters = () => {
  const { data, isLoading, error } = useQuery<CoverLetter[]>({
    queryKey: ["coverLetters"],
    queryFn: async () => {
      const { data } = await axios.get<CoverLetter[]>("/api/coverLetter");
      return data;
    },
  });
  return { coverLetters: data, isLoading, error };
};

export default useGetAllCoverLetters;
