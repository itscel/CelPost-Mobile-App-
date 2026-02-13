import { useState } from "react";

export type Post = {
  user: string;
  text: string;
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (text: string, user: string) => {
    const newPost: Post = { user, text };
    setPosts([newPost, ...posts]);
  };

  return { posts, addPost };
}
