import { supabase } from "../database/supabase-client";
import { IShoe } from "../models/IShoe";

export async function getShoes(): Promise<IShoe[]> {
  const { data, error } = await supabase
    .from("shoes")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .returns<IShoe[]>();

  if (error) return [];

  return data;
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
    throw error;
  }
  return data;
}

export async function deleteShoe(id: string) {
  const { error } = await supabase.from("shoes").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
