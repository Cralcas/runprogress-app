import { supabase } from "../database/supabase-client";
import { IPost } from "../models/IPost";
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
  postData: IPost,
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
    console.error("Error saving goal:", error);
    throw error;
  }

  return data;
}
