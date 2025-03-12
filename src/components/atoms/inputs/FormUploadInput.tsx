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
    noClick: false,
    noKeyboard: false,
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
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>

      <div
        {...getRootProps()}
        className={cn(
          `relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2
          border-dashed p-6 transition-colors`,
          isDragActive && "bg-gray-50",
          isDragAccept && "border-green-500 bg-green-50",
          isDragReject && "border-red-500 bg-red-50",
          !isDragActive && !file && "border-gray-200 hover:border-gray-300",
          file && "border-blue-500 bg-blue-50"
        )}
      >
        <input {...getInputProps({ id: name, name })} />

        {previewUrl ? (
          <div className="relative h-48 w-full">
            <Image
              src={previewUrl}
              alt="Anteprima"
              className="size-full object-contain"
              fill
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
              onClick={clearFile}
              aria-label="Rimuovi immagine"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <FileIcon className="h-12 w-12 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">
              {isDragActive ? "Rilascia il file qui..." : placeholder}
            </span>
            {helperText && (
              <span className="text-xs text-gray-500">{helperText}</span>
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
