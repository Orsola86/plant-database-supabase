"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PAGES_PATH } from "@/utils/constants";
import handleImageUpload from "@/utils/functions/handle-image-upload";
import { createClient } from "@/utils/supabase/server";

const ITEMS_PER_PAGE = 12;

export type OrchidFormState = {
  errors?: {
    bloomingSeason?: string[];
    description?: string[];
    family?: string[];
    genus?: string[];
    humidity?: string[];
    image_url?: string[];
    light?: string[];
    origin?: string[];
    rest?: string[];
    species?: string[];
    temperature?: string[];
    water?: string[];
  };
  message?: string | null;
};

// Validation schema for the form
const OrchidFormSchema = z.object({
  bloomingSeason: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  family: z.string().min(1, "La famiglia è obbligatoria"),
  genus: z.string().optional(),
  humidity: z.string().optional().nullable(),
  image_url: z
    .string()
    .url("L'URL dell'immagine non è valido")
    .optional()
    .or(z.literal("")),
  light: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  rest: z.string().optional().nullable(),
  species: z.string().min(1, "La specie è obbligatoria"),
  temperature: z.string().optional().nullable(),
  water: z.string().optional().nullable(),
});

export async function addOrchid(
  prevState: OrchidFormState,
  formData: FormData
): Promise<OrchidFormState> {
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

    // Upload image before validation
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

    // Validate form data
    const validatedFields = OrchidFormSchema.safeParse({
      bloomingSeason: formData.get("bloomingSeason"),
      description: formData.get("description"),
      family: formData.get("family"),
      genus: formData.get("genus"),
      humidity: formData.get("humidity"),
      image_url: imageUrl || "",
      light: formData.get("light"),
      origin: formData.get("origin"),
      rest: formData.get("rest"),
      species: formData.get("species"),
      temperature: formData.get("temperature"),
      water: formData.get("water"),
    });

    if (!validatedFields.success) {
      console.warn("Validazione fallita:", validatedFields.error.flatten());
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Dati mancanti o non validi. Impossibile aggiungere l'orchidea.",
      };
    }

    // Extract validated data
    const {
      bloomingSeason,
      description,
      family,
      genus,
      humidity,
      light,
      origin,
      rest,
      species,
      temperature,
      water,
    } = validatedFields.data;

    // Insert into database
    try {
      const { error } = await supabase.from("plant-taxonomy").insert([
        {
          bloomingSeason: bloomingSeason || null,
          description: description || null,
          family,
          genus: genus || null,
          humidity: humidity || null,
          image_url: imageUrl || null,
          light: light || null,
          origin: origin || null,
          rest: rest || null,
          species,
          temperature: temperature || null,
          user_id: user.id,
          water: water || null,
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

  revalidatePath(PAGES_PATH.PROTECTED);
  redirect(PAGES_PATH.PROTECTED);
}

export async function updateOrchid(
  prevState: OrchidFormState,
  formData: FormData
): Promise<OrchidFormState> {
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

    // Get plant ID from form data
    const plantId = formData.get("id") as string;
    const keepExistingImage = formData.get("keepExistingImage") === "true";

    // Retrieve current plant data to verify ownership
    const { data: currentPlant, error: fetchError } = await supabase
      .from("plant-taxonomy")
      .select("*")
      .eq("id", plantId)
      .single();

    if (fetchError || !currentPlant) {
      return {
        message: "Orchidea non trovata",
        errors: {},
      };
    }

    // Check if user is the owner of the plant
    if (currentPlant.user_id !== user.id) {
      return {
        message: "Non sei autorizzato a modificare questa orchidea",
        errors: {},
      };
    }

    // Handle image upload if a new file is present
    const file = formData.get("file") as File | null;
    let imageUrl = currentPlant.image_url || "";

    if (file && file.size > 0) {
      const uploadResult = await handleImageUpload(supabase, user.id, file);
      if (!uploadResult.success) {
        return {
          message: uploadResult.message,
          errors: { image_url: [uploadResult.message] },
        };
      }
      imageUrl = uploadResult.url;
    } else if (!keepExistingImage) {
      // If user explicitly removed the image
      imageUrl = "";
    }

    // Validate form data
    const validatedFields = OrchidFormSchema.safeParse({
      bloomingSeason: formData.get("bloomingSeason"),
      description: formData.get("description"),
      family: formData.get("family"),
      genus: formData.get("genus"),
      humidity: formData.get("humidity"),
      image_url: imageUrl,
      light: formData.get("light"),
      origin: formData.get("origin"),
      rest: formData.get("rest"),
      species: formData.get("species"),
      temperature: formData.get("temperature"),
      water: formData.get("water"),
    });

    if (!validatedFields.success) {
      console.warn("Validazione fallita:", validatedFields.error.flatten());
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Dati mancanti o non validi. Impossibile aggiornare l'orchidea.",
      };
    }

    // Extract validated data
    const {
      bloomingSeason,
      description,
      family,
      genus,
      humidity,
      light,
      origin,
      rest,
      species,
      temperature,
      water,
    } = validatedFields.data;

    // Update database
    try {
      const { error } = await supabase
        .from("plant-taxonomy")
        .update({
          bloomingSeason: bloomingSeason || null,
          description: description || null,
          family,
          genus: genus || null,
          humidity: humidity || null,
          image_url: imageUrl || null,
          light: light || null,
          origin: origin || null,
          rest: rest || null,
          species,
          temperature: temperature || null,
          water: water || null,
        })
        .eq("id", plantId);

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
        message: `Errore durante l'aggiornamento dell'orchidea: ${errorMessage}`,
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

  revalidatePath(PAGES_PATH.PROTECTED);
  revalidatePath(`${PAGES_PATH.PROTECTED}/${formData.get("id")}`);
  redirect(`${PAGES_PATH.PROTECTED}/${formData.get("id")}`);
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

export const fetchPlants = async (
  query: string,
  family: string,
  genus: string,
  currentPage: number
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Calculate pagination offset
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Start building the query
  let dbQuery = supabase
    .from("plant-taxonomy")
    .select("*", { count: "exact" })
    .eq("user_id", user.id);

  // Add search filter if query exists
  if (query) {
    dbQuery = dbQuery.or(
      `family.ilike.%${query}%,genus.ilike.%${query}%,species.ilike.%${query}%`
    );
  }

  // Add family filter if it exists
  if (family) {
    dbQuery = dbQuery.eq("family", family);
  }

  // Add genus filter if it exists
  if (genus) {
    dbQuery = dbQuery.eq("genus", genus);
  }

  // Add pagination
  const {
    data: plants,
    error,
    count,
  } = await dbQuery
    .range(offset, offset + ITEMS_PER_PAGE - 1)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching plants:", error);
    return { plants: [], totalPages: 0 };
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return { plants, totalPages };
};
