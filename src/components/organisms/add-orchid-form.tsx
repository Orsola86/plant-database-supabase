"use client";

import { Toaster } from "sonner";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { FILES_EXTENSIONS, MAX_FILE_SIZE } from "@/utils/constants";
import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Card, CardContent } from "@/components/molecules/card";
import { addOrchid } from "@/app/orchid-action/orchidActions";
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

export default function AddOrchidForm() {
  const initialState: OrchidFormState = { message: null, errors: {} };
  const [state, dispatch, isPending] = useActionState(addOrchid, initialState);

  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (
    newFile: File | null,
    error: FileUploadError | null
  ) => {
    // Update the file state
    setFile(newFile);

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
    <div className="container mx-auto max-w-2xl py-12">
      <Toaster position="bottom-right" />
      <h1 className="mb-8 text-2xl font-bold">Aggiungi Orchidea</h1>

      <Card>
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormInput
                name="family"
                label="Famiglia"
                errorMessage={state?.errors?.family || []}
                defaultValue="Orchidaceae"
              />

              <FormInput
                name="genus"
                label="Genere"
                errorMessage={state?.errors?.genus || []}
                placeholder="Es. Phalaenopsis"
              />

              <FormInput
                name="species"
                label="Specie"
                errorMessage={state?.errors?.species || []}
                placeholder="Es. Phalaenopsis gibbosa"
                required
              />

              <FormUploadInput
                name="image"
                label="Immagine dell'orchidea"
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
                  Caricamento in corso...
                </>
              ) : (
                "Aggiungi orchidea"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
