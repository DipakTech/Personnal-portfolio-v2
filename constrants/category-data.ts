export type Post = {
  title: string;
  slug: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
  created: string;
  author: string;
};
export const postData: Post[] = [
  {
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    content:
      "A comprehensive guide to React Hooks, including useState and useEffect.",
    image: "https://example.com/images/react-hooks.jpg",
    category: "React",
    published: true,
    created: "2024-01-15T10:00:00Z",
    author: "John Doe",
  },
  {
    title: "CSS Grid vs Flexbox",
    slug: "css-grid-vs-flexbox",
    content:
      "An in-depth comparison of CSS Grid and Flexbox layout techniques.",
    image: "https://example.com/images/css-grid-flexbox.jpg",
    category: "CSS",
    published: true,
    created: "2024-02-20T12:30:00Z",
    author: "Jane Smith",
  },
  {
    title: "JavaScript ES6 Features",
    slug: "javascript-es6-features",
    content:
      "Explore the new features introduced in ES6 and how they improve JavaScript development.",
    image: "https://example.com/images/es6-features.jpg",
    category: "JavaScript",
    published: true,
    created: "2024-03-05T09:15:00Z",
    author: "Alice Johnson",
  },
  {
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    content:
      "A beginner's guide to TypeScript, its features, and how to get started.",
    image: "https://example.com/images/typescript-intro.jpg",
    category: "TypeScript",
    published: false,
    created: "2024-04-10T11:45:00Z",
    author: "Bob Brown",
  },
  {
    title: "Building REST APIs with Node.js",
    slug: "building-rest-apis-with-nodejs",
    content: "Learn how to create RESTful APIs using Node.js and Express.",
    image: "https://example.com/images/nodejs-rest-api.jpg",
    category: "Node.js",
    published: true,
    created: "2024-05-25T14:00:00Z",
    author: "Charlie Davis",
  },
];

export type Category = {
  name: string;
  image?: string;
};

export const categoryData: Category[] = [
  {
    name: "lsdjflskdf",
    image: "https://example.com/images/react-hooks.jpg",
  },
  {
    name: "lksjdfklsdjf",
    image: "https://example.com/images/react-hooks.jpg",
  },
  {
    name: "lsdjflskdf",
    image: "https://example.com/images/react-hooks.jpg",
  },
];
