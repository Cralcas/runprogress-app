import { supabase } from "../database/supabase-client";
import { IShoe } from "../models/IShoe";

export async function getShoes(): Promise<IShoe[]> {
  try {
    const { data, error } = await supabase
      .from("shoes")
      .select("*")
      .returns<IShoe[]>();

    if (error) return [];

    return data;
  } catch (err) {
    console.error("Error fetching shoes:", err);
    throw err;
  }
}

export async function addShoe(
  userId: string,
  shoeModel: string
): Promise<IShoe> {
  const { data, error } = await supabase
    .from("shoes")
    .insert([
      {
        user_id: userId,
        model: shoeModel,
        mileage: 0,
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

export async function deleteShoe(id: string) {
  const { error } = await supabase.from("shoes").delete().eq("id", id);

  if (error) {
    console.error("Error saving goal:", error);
    throw error;
  }
}
