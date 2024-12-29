import { supabase } from "../database/supabase-client";
import { PostCreate } from "../models/IPost";
import { PostType } from "../models/types";

export async function getPosts(
  start: string,
  end: string
): Promise<PostType[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: false });

  if (error || !data) {
    throw error;
  }

  return data;
}

export async function createPost(
  postData: PostCreate,
  userId: string
): Promise<PostType> {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: userId,
        title: postData.title,
        description: postData.description,
        distance: postData.distance,
        pace: postData.pace,
        time: postData.time,
        shoe: postData.shoe,
      },
    ])
    .select()
    .single();

  if (error || !data) {
    throw error;
  }

  return data;
}

export async function updatePost(
  id: string,
  post: PostCreate
): Promise<PostType> {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    throw error;
  }

  return data;
}
export async function deletePost(id: string): Promise<PostType> {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    throw error;
  }

  return data;
}
