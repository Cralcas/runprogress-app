import { IPost } from "../components/PostForm/PostForm";
import { supabase } from "../database/supabase-client";

export async function savePost(postData: IPost, userId: string) {
  const { error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: userId,
        title: postData.title,
        description: postData.description,
        distance: postData.distance,
        time: postData.time,
        shoe: postData.shoe,
      },
    ])
    .single();
}
