"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import handleImageUpload from "@/utils/functions/handle-image-upload";
import { createClient } from "@/utils/supabase/server";

export type OrchidFormState = {
  errors?: {
    family?: string[];
    genus?: string[];
    species?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function addOrchid(
  prevState: OrchidFormState,
  formData: FormData
): Promise<OrchidFormState> {
  // Schema di validazione per il form
  const OrchidFormSchema = z.object({
    family: z.string().min(1, "La famiglia è obbligatoria"),
    genus: z.string().optional(),
    species: z.string().min(1, "La specie è obbligatoria"),
    image_url: z
      .string()
      .url("L'URL dell'immagine non è valido")
      .optional()
      .or(z.literal("")),
  });

  try {
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

    // Caricamento immagine prima della validazione
    const file = formData.get("file") as File | null;
    let imageUrl = "";

    if (file && file.size > 0) {
      const uploadResult = await handleImageUpload(supabase, user.id, file);

      if (!uploadResult.success) {
        return {
          message: uploadResult.message,
          errors: { image_url: [uploadResult.message] },
        };
      }

      imageUrl = uploadResult.url;
    }

    // Validazione dei dati del form
    const validatedFields = OrchidFormSchema.safeParse({
      family: formData.get("family"),
      genus: formData.get("genus"),
      species: formData.get("species"),
      image_url: imageUrl || "",
    });

    if (!validatedFields.success) {
      console.warn("Validazione fallita:", validatedFields.error.flatten());
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Dati mancanti o non validi. Impossibile aggiungere l'orchidea.",
      };
    }

    // Estrazione dei dati validati
    const { family, genus, species } = validatedFields.data;

    // Inserimento nel database
    try {
      const { error } = await supabase.from("plant-taxonomy").insert([
        {
          family,
          genus: genus || null,
          species,
          image_url: imageUrl || null,
          user_id: user.id,
        },
      ]);

      if (error) {
        return {
          message: `Errore database: ${error.message}`,
          errors: {},
        };
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Errore sconosciuto";

      return {
        message: `Errore durante l'aggiunta dell'orchidea: ${errorMessage}`,
        errors: {},
      };
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Errore sconosciuto";

    return {
      message: `Errore imprevisto: ${errorMessage}`,
      errors: {},
    };
  }

  revalidatePath("/protected");
  redirect("/protected");
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
    .eq("id", id)
    .single();

  if (plantCollection) {
    return plantCollection;
  }

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
};
