"use server";

import { z } from "zod";
import {
  revalidatePath,
  revalidateTag,
  unstable_cache as unstableCache,
} from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redirect } from "next/navigation";
import { PAGES_PATH } from "@/utils/constants";
import handleImageUpload from "@/utils/functions/handle-image-upload";
import {
  createClient,
  createClientWithCookies,
  getCookieStore,
} from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

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

// Helper per ottenere il client Supabase e l'utente corrente
async function getSupabaseClientAndUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Utente non autenticato");
  }

  return { supabase, user };
}

// Schema di validazione centralizzato
const OrchidFormSchema = z.object({
  bloomingSeason: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  family: z.string().min(1, "La famiglia è obbligatoria"),
  genus: z.string().optional().nullable(),
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

// Helper per la gestione dell'upload immagine
async function handleOrchidImageUpload(
  supabase: SupabaseClient,
  userId: string,
  file: File | null
): Promise<string> {
  if (file && file.size > 0) {
    const uploadResult = await handleImageUpload(supabase, userId, file);
    if (!uploadResult.success) throw new Error(uploadResult.message);
    return uploadResult.url;
  }
  return "";
}

// Modifica la funzione per non includere redirect
export async function revalidateOrchidCaches(id?: string) {
  // Revalida la collezione di piante
  revalidateTag("plants-collection");

  // Revalida i dettagli della pianta se viene fornito un ID
  if (id) {
    revalidateTag("plant-detail");
    revalidatePath(`${PAGES_PATH.PROTECTED}/${id}`);
  } else {
    revalidatePath(PAGES_PATH.PROTECTED);
  }
}

async function saveOrchid(
  prevState: OrchidFormState,
  formData: FormData,
  isUpdate = false
): Promise<OrchidFormState> {
  try {
    const { supabase, user } = await getSupabaseClientAndUser();

    const file = formData.get("file") as File | null;
    let imageUrl = "";

    if (!isUpdate || (file && file.size > 0)) {
      imageUrl = await handleOrchidImageUpload(supabase, user.id, file);
    }

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
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Dati mancanti o non validi.",
      };
    }

    const plantData = validatedFields.data;
    const plantId = formData.get("id") as string;

    const dbAction = isUpdate
      ? supabase.from("plant-taxonomy").update(plantData).eq("id", plantId)
      : supabase
          .from("plant-taxonomy")
          .insert({ ...plantData, user_id: user.id });

    const { error } = await dbAction;

    if (error) throw new Error(error.message);

    revalidateOrchidCaches(isUpdate ? plantId : undefined);
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Errore imprevisto",
      errors: {},
    };
  }

  // Redirect outside the try/catch block
  if (isUpdate) {
    redirect(`${PAGES_PATH.PROTECTED}/${formData.get("id")}`);
  } else {
    redirect(PAGES_PATH.PROTECTED);
  }
}

// Funzioni pubbliche che utilizzano la funzione generica
export const addOrchid = async (
  prevState: OrchidFormState,
  formData: FormData
) => saveOrchid(prevState, formData);

export const updateOrchid = async (
  prevState: OrchidFormState,
  formData: FormData
) => saveOrchid(prevState, formData, true);

export const getPlantByIdWithCache = async (id: string) => {
  const cookieStore = await getCookieStore();
  return getCachedPlantById(id, cookieStore);
};

const getCachedPlantById = unstableCache(
  async (id: string, cookieStore: ReadonlyRequestCookies) => {
    const supabase = createClientWithCookies(cookieStore);

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
  },
  ["plant-by-id"],
  { tags: ["plant-detail"] }
);

export const getUserPlantsWithCache = async (
  query: string,
  family: string,
  genus: string,
  currentPage: number
) => {
  try {
    const cookieStore = await getCookieStore();
    const supabase = createClientWithCookies(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Utente non autenticato");
    }

    return getCachedPlants(
      query,
      family,
      genus,
      currentPage,
      user.id,
      cookieStore
    );
  } catch (error) {
    console.error("Error fetching plants:", error);
    return { plants: [], totalPages: 0 };
  }
};

const getCachedPlants = unstableCache(
  async (
    query: string,
    family: string,
    genus: string,
    currentPage: number,
    userId: string,
    cookieStore: ReadonlyRequestCookies
  ) => {
    const supabase = createClientWithCookies(cookieStore);

    // Calculate pagination offset
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // Start building the query
    let dbQuery = supabase
      .from("plant-taxonomy")
      .select("*", { count: "exact" })
      .eq("user_id", userId);

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
  },
  ["plants-list"],
  { tags: ["plants-collection"] }
);
