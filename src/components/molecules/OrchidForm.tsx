"use client";

import { Toaster } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Flower, Loader2 } from "lucide-react";
import { FILES_EXTENSIONS, MAX_FILE_SIZE } from "@/utils/constants";
import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import {
  type FileUploadError,
  FormUploadInput,
} from "@/components/atoms/inputs/FormUploadInput";
import { Card, CardContent } from "@/components/molecules/card";
import type { OrchidFormState } from "@/app/orchid-action/orchidActions";
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

    // Se viene selezionato un nuovo file, non mantenere l'immagine esistente
    if (newFile) {
      setKeepExistingImage(false);
    }
    // Se il file viene rimosso esplicitamente (tramite il pulsante X), non mantenere l'immagine esistente
    else if (newFile === null && !error) {
      setKeepExistingImage(false);
    }

    // Se c'è un errore, aggiorna lo stato dell'errore del form
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
      {!initialData && (
        <div className="flex items-center gap-3 bg-green-700 px-6 py-5 text-white">
          <Flower className="size-10" />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      )}
      <Card className="border-0 shadow-none">
        <CardContent className="px-8 pt-8">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <FormInput
                name="family"
                label="Famiglia"
                errorMessage={state?.errors?.family || []}
                defaultValue={initialData?.family || "Orchidaceae"}
                className="focus-within:border-green-500 focus-within:ring-green-500"
              />

              <FormInput
                name="genus"
                label="Genere"
                errorMessage={state?.errors?.genus || []}
                defaultValue={initialData?.genus || ""}
                placeholder="Es. Phalaenopsis"
                className="focus-within:border-green-500 focus-within:ring-green-500"
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  name="rest"
                  label="Periodo di riposo"
                  errorMessage={state?.errors?.rest || []}
                  defaultValue={initialData?.rest || ""}
                  placeholder="Es. Inverno"
                />

                <FormInput
                  name="light"
                  label="Luce"
                  errorMessage={state?.errors?.light || []}
                  defaultValue={initialData?.light || ""}
                  placeholder="Es. Luce indiretta brillante"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  name="water"
                  label="Acqua"
                  errorMessage={state?.errors?.water || []}
                  defaultValue={initialData?.water || ""}
                  placeholder="Es. Moderata, lasciare asciugare"
                />

                <FormInput
                  name="temperature"
                  label="Temperatura"
                  errorMessage={state?.errors?.temperature || []}
                  defaultValue={initialData?.temperature || ""}
                  placeholder="Es. 18-24°C"
                />
              </div>

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
                  <div
                    className="relative h-40 w-40 overflow-hidden rounded-md border-2 border-green-100
                      shadow-sm"
                  >
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
                defaultValue={initialData?.image_url || ""}
              />
            </div>

            {(state?.message || formError) && (
              <div className="rounded-md border border-red-100 bg-red-50 p-4">
                {state?.message && <FormMessage error={state.message} />}
                {formError && <FormMessage error={formError} />}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !!formError}
              className="w-full bg-green-700 py-6 text-white hover:bg-green-800"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
