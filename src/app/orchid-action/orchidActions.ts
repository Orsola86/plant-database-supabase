"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Schema di validazione per il form
const OrchidFormSchema = z.object({
  family: z.string().min(1, "La famiglia è obbligatoria"),
  genus: z.string().optional(),
  species: z.string().min(1, "La specie è obbligatoria"),
  // image_url: z
  //   .string()
  //   .url("L'URL dell'immagine non è valido")
  //   .optional()
  //   .or(z.literal("")),
});

export type OrchidFormState = {
  errors?: {
    family?: string[];
    genus?: string[];
    species?: string[];
    // image_url?: string[];
  };
  message?: string | null;
};

export async function addOrchid(
  prevState: OrchidFormState,
  formData: FormData
): Promise<OrchidFormState> {
  // Validazione dei dati del form
  const validatedFields = OrchidFormSchema.safeParse({
    family: formData.get("family"),
    genus: formData.get("genus"),
    species: formData.get("species"),
    // image_url: formData.get("image_url"),
  });

  // Se la validazione fallisce, restituisci gli errori
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Dati mancanti o non validi. Impossibile aggiungere l'orchidea.",
    };
  }

  // Estrai i dati validati
  const { family, genus, species } = validatedFields.data;

  // Crea il client Supabase
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Utente non autenticato",
      errors: {},
    };
  }

  try {
    await supabase
      .from("plant-taxonomy")
      .insert([
        {
          family,
          genus: genus || null,
          species,
          // image_url: imageUrl || null,
          user_id: user.id,
        },
      ])
      .select();
  } catch (error) {
    return {
      message: "Errore durante l'aggiunta dell'orchidea.",
      errors: {},
    };
  }

  // Aggiorna la cache e reindirizza l'utente
  revalidatePath("/protected");
  redirect("/protected");

  return {
    message: "Orchidea aggiunta con successo",
    errors: {},
  };
}

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
