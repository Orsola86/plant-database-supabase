"use client";

import { Toaster } from "sonner";
import Image from "next/image";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { FILES_EXTENSIONS, MAX_FILE_SIZE } from "@/utils/constants";
import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Card, CardContent } from "@/components/molecules/card";
import { updateOrchid } from "@/app/orchid-action/orchidActions";
import { Tables } from "@/types/database.types";
import {
  FileUploadError,
  FormUploadInput,
} from "../atoms/inputs/FormUploadInput";

interface OrchidFormState {
  message: string | null;
  errors: {
    family?: string[];
    genus?: string[];
    species?: string[];
    image_url?: string[];
    [key: string]: string[] | undefined;
  };
}

export default function EditOrchidForm(props: Tables<"plant-taxonomy">) {
  const initialState: OrchidFormState = { message: null, errors: {} };
  const [state, dispatch, isPending] = useActionState(
    updateOrchid,
    initialState
  );

  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [keepExistingImage, setKeepExistingImage] = useState(true);

  const handleFileChange = (
    newFile: File | null,
    error: FileUploadError | null
  ) => {
    // Update the file state
    setFile(newFile);

    // If a new file is selected, we're not keeping the existing image
    if (newFile) {
      setKeepExistingImage(false);
    }

    // If there's an error, update the form error state
    if (error) {
      setFormError(error.message);
    } else {
      setFormError(null);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Clear any previous form errors
    setFormError(null);

    // Add the plant ID to the form data
    formData.append("id", props?.id);

    // Add the keepExistingImage flag
    formData.append("keepExistingImage", keepExistingImage.toString());

    // If we have a file, add it to the FormData
    if (file) {
      formData.append("file", file);
    }

    // Submit the form with the file (if present)
    try {
      await dispatch(formData);
    } catch (error) {
      console.error("Errore durante l'invio del form:", error);
      setFormError(
        `Errore durante l'invio: ${error instanceof Error ? error.message : "Errore sconosciuto"}`
      );
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />

      <Card>
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormInput
                name="family"
                label="Famiglia"
                errorMessage={state?.errors?.family || []}
                defaultValue={props?.family || ""}
              />

              <FormInput
                name="genus"
                label="Genere"
                errorMessage={state?.errors?.genus || []}
                defaultValue={props?.genus || ""}
                placeholder="Es. Phalaenopsis"
              />

              <FormInput
                name="species"
                label="Specie"
                errorMessage={state?.errors?.species || []}
                defaultValue={props?.species || ""}
                placeholder="Es. Phalaenopsis gibbosa"
                required
              />

              {props?.image_url && (
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Immagine attuale:
                  </p>
                  <div className="relative h-32 w-32 overflow-hidden rounded-md">
                    <Image
                      src={props?.image_url}
                      alt={props?.species || ""}
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <FormUploadInput
                name="image"
                label={
                  props?.image_url
                    ? "Sostituisci immagine (opzionale)"
                    : "Aggiungi immagine"
                }
                onChange={handleFileChange}
                maxSize={MAX_FILE_SIZE}
                errorMessage={state?.errors?.image_url || []}
                helperText={`${FILES_EXTENSIONS.all.image.join(", ")} (max ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB)`}
              />
            </div>

            {(state?.message || formError) && (
              <div className="rounded-md bg-red-50 p-4">
                {state?.message && <FormMessage error={state.message} />}
                {formError && <FormMessage error={formError} />}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !!formError}
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Aggiornamento in corso...
                </>
              ) : (
                "Salva modifiche"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
