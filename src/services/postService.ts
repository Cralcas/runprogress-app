import { supabase } from "../database/supabase-client";
import { IPost } from "../models/IPost";

export async function getPosts(start: string, end: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .returns<IPost[]>();

  if (error || !data) {
    throw error;
  }

  return data;
}

export async function createPost(postData: IPost, userId: string) {
  const { error } = await supabase
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
    .single();

  if (error) {
    console.error("Error saving goal:", error);
    throw error;
  }
}
