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
