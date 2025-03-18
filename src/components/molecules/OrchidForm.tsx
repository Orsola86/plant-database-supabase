"use client";

import { Toaster } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FILES_EXTENSIONS, MAX_FILE_SIZE } from "@/utils/constants";
import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import {
  type FileUploadError,
  FormUploadInput,
} from "@/components/atoms/inputs/FormUploadInput";
import { Card, CardContent } from "@/components/molecules/card";
import { OrchidFormState } from "@/app/orchid-action/orchidActions";
import type { Tables } from "@/types/database.types";

interface OrchidFormProps {
  initialData?: Tables<"plant-taxonomy">;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  state: OrchidFormState;
  title: string;
  submitButtonText: string;
  loadingText: string;
}

export function OrchidForm({
  initialData,
  onSubmit,
  isPending,
  state,
  title,
  submitButtonText,
  loadingText,
}: OrchidFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [keepExistingImage, setKeepExistingImage] = useState(true);

  const handleFileChange = (
    newFile: File | null,
    error: FileUploadError | null
  ) => {
    // Update file state
    setFile(newFile);

    // If a new file is selected, we won't keep the existing image
    if (newFile && initialData?.image_url) {
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
    // Clear previous form errors
    setFormError(null);

    // If we're editing, add the ID and keepExistingImage flag
    if (initialData?.id) {
      formData.append("id", initialData.id);
      formData.append("keepExistingImage", keepExistingImage.toString());
    }

    // If we have a file, add it to FormData
    if (file) {
      formData.append("file", file);
    }

    // Submit the form
    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Errore durante l'invio del form:", error);
      setFormError(
        `Errore durante l'invio: ${error instanceof Error ? error.message : "Errore sconosciuto"}`
      );
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      {!initialData && <h1 className="mb-8 text-2xl font-bold">{title}</h1>}
      <Card>
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormInput
                name="family"
                label="Famiglia"
                errorMessage={state?.errors?.family || []}
                defaultValue={initialData?.family || "Orchidaceae"}
              />

              <FormInput
                name="genus"
                label="Genere"
                errorMessage={state?.errors?.genus || []}
                defaultValue={initialData?.genus || ""}
                placeholder="Es. Phalaenopsis"
              />

              <FormInput
                name="species"
                label="Specie"
                errorMessage={state?.errors?.species || []}
                defaultValue={initialData?.species || ""}
                placeholder="Es. Phalaenopsis gibbosa"
                required
              />

              {/* Additional fields from database schema */}
              <FormInput
                name="description"
                label="Descrizione"
                errorMessage={state?.errors?.description || []}
                defaultValue={initialData?.description || ""}
                placeholder="Descrizione dell'orchidea"
              />

              <FormInput
                name="origin"
                label="Origine"
                errorMessage={state?.errors?.origin || []}
                defaultValue={initialData?.origin || ""}
                placeholder="Es. Sud-est asiatico"
              />

              <FormInput
                name="bloomingSeason"
                label="Stagione di fioritura"
                errorMessage={state?.errors?.bloomingSeason || []}
                defaultValue={initialData?.bloomingSeason || ""}
                placeholder="Es. Primavera-Estate"
              />

              <FormInput
                name="rest"
                label="Periodo di riposo"
                errorMessage={state?.errors?.rest || []}
                defaultValue={initialData?.rest || ""}
                placeholder="Es. Primavera-Estate"
              />

              <FormInput
                name="light"
                label="Luce"
                errorMessage={state?.errors?.light || []}
                defaultValue={initialData?.light || ""}
                placeholder="Es. Luce indiretta brillante"
              />

              <FormInput
                name="water"
                label="Acqua"
                errorMessage={state?.errors?.water || []}
                defaultValue={initialData?.water || ""}
                placeholder="Es. Moderata, lasciare asciugare tra le annaffiature"
              />

              <FormInput
                name="temperature"
                label="Temperatura"
                errorMessage={state?.errors?.temperature || []}
                defaultValue={initialData?.temperature || ""}
                placeholder="Es. 18-24°C"
              />

              <FormInput
                name="humidity"
                label="Umidità"
                errorMessage={state?.errors?.humidity || []}
                defaultValue={initialData?.humidity || ""}
                placeholder="Es. 50-70%"
              />

              {initialData?.image_url && (
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Immagine attuale:
                  </p>
                  <div className="relative h-32 w-32 overflow-hidden rounded-md">
                    <Image
                      src={initialData.image_url || "/placeholder.svg"}
                      alt={initialData.species || ""}
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <FormUploadInput
                name="image"
                label={
                  initialData?.image_url
                    ? "Sostituisci immagine (facoltativo)"
                    : "Aggiungi immagine"
                }
                onChange={handleFileChange}
                maxSize={MAX_FILE_SIZE}
                errorMessage={state?.errors?.image_url || []}
                helperText={`${FILES_EXTENSIONS.all.image.join(", ")} (max ${Math.round(
                  MAX_FILE_SIZE / (1024 * 1024)
                )}MB)`}
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
                  {loadingText}
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
