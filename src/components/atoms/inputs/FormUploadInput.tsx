"use client";

import { toast } from "sonner";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  type DropzoneOptions,
  type FileRejection,
  useDropzone,
} from "react-dropzone";
import { FileIcon, X } from "lucide-react";
import { FILES_EXTENSIONS } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Label } from "@/components/atoms/label";

export interface FileUploadError {
  message: string;
  code?: string;
}

interface FormUploadInputProps {
  name: string;
  label: string;
  accept?: Record<string, string[]>;
  maxSize?: number;
  errorMessage?: string[];
  placeholder?: React.ReactNode;
  helperText?: string;
  onChange?: (file: File | null, error: FileUploadError | null) => void;
  defaultValue?: string;
  className?: string;
}

export const FormUploadInput = ({
  name,
  label,
  accept = {
    "image/*": FILES_EXTENSIONS.all.image,
  },
  maxSize = 7 * 1024 * 1024, // 7MB default
  errorMessage = [],
  placeholder = "Trascina un'immagine o clicca per selezionarla",
  helperText,
  onChange,
  defaultValue,
  className,
}: FormUploadInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null
  );
  const [clientError, setClientError] = useState<string | null>(null);

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setClientError(null);

        // Create preview URL
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);

        // Call onChange callback if provided
        if (onChange) {
          onChange(selectedFile, null);
        }
      }

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        const error = rejection.errors[0];
        let errorMsg = "";
        const errorCode = error.code;

        if (error.code === "file-too-large") {
          const maxSizeMB = Math.round(maxSize / (1024 * 1024));
          errorMsg = `L'immagine non può superare i ${maxSizeMB}MB`;
        } else if (error.code === "file-invalid-type") {
          errorMsg = "Il file deve essere un'immagine";
        } else if (error.message) {
          errorMsg = error.message;
        }

        setClientError(errorMsg);
        toast.error(errorMsg);

        // Notify parent component about the error
        if (onChange) {
          onChange(null, { message: errorMsg, code: errorCode });
        }
      }
    },
    [maxSize, onChange]
  );

  // Configure dropzone
  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    multiple: false,
    noClick: previewUrl ? true : false, // Disabilita il click se c'è già un'immagine
    noKeyboard: previewUrl ? true : false, // Disabilita gli eventi da tastiera se c'è già un'immagine
    preventDropOnDocument: true,
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone(dropzoneOptions);

  // Cleanup function for object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== defaultValue) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, defaultValue]);

  const clearFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setFile(null);
    setPreviewUrl(null);
    setClientError(null);

    // Call onChange callback if provided
    if (onChange) {
      onChange(null, null);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>

      <div
        {...getRootProps({
          onClick: (e) => {
            // Se c'è già un'immagine, previeni il comportamento predefinito del dropzone
            if (previewUrl) {
              e.stopPropagation();
            }
          },
        })}
        className={cn(
          `relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2
          border-dashed p-6 transition-colors`,
          isDragActive && "bg-gray-50",
          isDragAccept && "border-green-500 bg-green-50",
          isDragReject && "border-red-500 bg-red-50",
          !isDragActive &&
            !file &&
            !previewUrl &&
            "border-gray-200 hover:border-gray-300",
          (file || previewUrl) && "border-blue-500 bg-blue-50"
        )}
      >
        <input
          {...getInputProps({
            id: name,
            name,
            onClick: (e) => {
              // Se c'è già un'immagine, previeni il comportamento predefinito
              if (previewUrl) {
                e.stopPropagation();
              }
            },
          })}
        />

        {previewUrl ? (
          <div className="relative h-48 w-full">
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Anteprima"
              className="size-full object-contain"
              fill
            />
            <div className="absolute right-2 top-2 flex gap-2">
              <button
                type="button"
                className="rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Apri il selettore di file solo quando si clicca esplicitamente questo pulsante
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = Object.entries(accept)
                    .map(([type, exts]) => `${type}, ${exts.join(", ")}`)
                    .join(", ");
                  fileInput.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      onDrop([files[0]], []);
                    }
                  };
                  fileInput.click();
                }}
                aria-label="Cambia immagine"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                onClick={clearFile}
                aria-label="Rimuovi immagine"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <FileIcon className="h-12 w-12 text-gray-400" />
            <span className="text-[1.4rem] font-medium text-gray-500">
              {isDragActive ? "Rilascia il file qui..." : placeholder}
            </span>
            {helperText && (
              <span className="text-[1.4rem] text-gray-500">{helperText}</span>
            )}
          </>
        )}
      </div>

      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {clientError && <FormMessage error={clientError} />}
        {!!errorMessage?.length &&
          errorMessage.map((error: string) => (
            <FormMessage key={error} error={error} />
          ))}
      </div>
    </div>
  );
};
