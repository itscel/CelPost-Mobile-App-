import { useState } from "react";

export type Post = {
  user: string;
  text: string;
  category: string;
  audience: string;
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (
    text: string,
    user: string,
    category: string,
    audience: string
  ) => {
    const newPost: Post = {
      user,
      text,
      category,
      audience,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { posts, addPost };
}
