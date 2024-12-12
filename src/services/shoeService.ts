import { supabase } from "../database/supabase-client";

export interface IShoe {
  id: string;
  mileage: number;
  model: string;
}

export async function getShoes(): Promise<IShoe[]> {
  try {
    const { data, error } = await supabase
      .from("shoes")
      .select("*")
      .returns<IShoe[]>();

    if (error) {
      console.error("Error finding shoes", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Error fetching shoes:", err);
    throw err;
  }
}
