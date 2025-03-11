"use server";

import { createClient } from "@/utils/supabase/server";

export const getCollections = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("plant-taxonomy")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching collections:", error);
    return null;
  }

  return data;
};

export const getPlantById = async (id: string) => {
  const supabase = await createClient();

  const { data: plantCollection, error } = await supabase
    .from("plant-taxonomy")
    .select("*")
    .eq("id", id);

  if (plantCollection) {
    return plantCollection;
  }

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
};
