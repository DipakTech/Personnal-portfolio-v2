export type Posts = Post[];

export interface Post {
  author: Author;
  published: boolean;
  authorId: string;
  category: Category;
  createdAt: Date;
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  tags: Tag[];
}

export interface Author {
  id: string;
  email: string;
  name: string | null;
  userAvatar: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  tag: {
    id: string;
    name: string;
  };
}
