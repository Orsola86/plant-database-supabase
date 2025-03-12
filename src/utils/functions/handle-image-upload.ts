import { MAX_FILE_SIZE } from "@/utils/constants";
import { SupabaseClient } from "@supabase/supabase-js";

interface UploadResult {
  success: boolean;
  message: string;
  url: string;
}
// Funzione per il caricamento dell'immagine
export default async function handleImageUpload(
  supabase: SupabaseClient,
  userId: string,
  file: File
): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: `ciao`,
      url: "",
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      success: false,
      message: "Il file deve essere un'immagine",
      url: "",
    };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `IMG_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      return {
        success: false,
        message: `Errore durante l'upload: ${error.message}`,
        url: "",
      };
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return {
        success: false,
        message: "Errore nel recupero dell'URL pubblico",
        url: "",
      };
    }

    return {
      success: true,
      message: "Upload completato",
      url: urlData.publicUrl,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Errore sconosciuto";
    return {
      success: false,
      message: `Errore durante l'upload: ${errorMessage}`,
      url: "",
    };
  }
}
