import { supabase } from "../database/supabase-client";
import { IChartData } from "../models/IChartData";

export async function getChartData(year: number): Promise<IChartData[]> {
  const { data, error } = await supabase.rpc("get_total_distance_by_year", {
    target_year: year,
  });

  if (error || !data) {
    console.error("Error fetching chart data:", error);
    return [];
  }

  return data.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", { month: "short" }),
    km: item.km,
  }));
}
