import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export type BlogInfo = {
  Title: string;
  Category: string;
  Tags: string;
};

export async function main(Blog: BlogInfo) {
  const chatCompletion = await getGroqChatCompletion(Blog);
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
        role: "system",
        content:
          "You are an AI assistant that generates blog content. Your task is to create the body of a blog post in HTML format, without including the <html>, <head>, or <body> tags. Focus on producing well-structured, SEO-friendly content that can be easily edited later.",
      },
      {
        role: "user",
        content: `
                Generate the body content for a blog post with the following details:
                - Title: ${Title}
                - Category: ${Category}
                - Tags: ${Tags}

                Please follow these guidelines: 
                1. Use appropriate heading tags (h2, h3, etc.) for sections and subsections.
                2. Include relevant paragraphs, bullet points, and numbered lists where appropriate.
                3. Incorporate the provided tags naturally throughout the content.
                4. Conclude with a summary paragraph.
                5. Ensure the content is SEO-friendly by using relevant keywords from the title and tags.
                6. Do not include any <html>, <head>, <body>, or other outer structural tags.
                7. Focus on producing only the content that would go inside the <body> tag.
                8. Aim for a length of 1500-2000 words.
                9.Use code snippets if needed to showcase examples.
                10.format the snippets using <pre> and <code> tags if needed line break needed give them correctly. 
                11.the response should include the same classname and id as the provided HTML content. 
                
                Do not Begin your response with "Here is the generated content:" followed by a line break. straight provide the HTML content:
                 `,
      },
    ],
    model: "llama3-8b-8192",
  });
}
