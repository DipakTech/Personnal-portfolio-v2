export type Posts = Post[];

export interface Post {
  author: Author;
  published: boolean;
  authorId: string;
  category: Category;
  createdAt: string;
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  tags: Tag[];
}

export interface Author {
  id: string;
  email: string;
  name: string;
  userAvatar: string;
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
