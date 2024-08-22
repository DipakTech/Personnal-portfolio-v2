import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export type BlogInfo = {
  Title: string;
  Category: string;
  Tags: string;
};

export async function main(Blog: BlogInfo) {
  const chatCompletion = await getGroqChatCompletion(Blog);
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion({
  Title,
  Category,
  Tags,
}: {
  Title: string;
  Category: string;
  Tags: string;
}) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
          Generate a blog post in HTML format based on the following details:
        - Title: ${Title}
        - Category: ${Category}
        - Tags: ${Tags}
          The blog post should be well-structured, SEO-friendly, and include relevant headings, paragraphs, and bullet points where appropriate.
          `,
      },
    ],
    model: "llama3-8b-8192",
  });
}
