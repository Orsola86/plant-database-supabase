"use client";

import { useActionState } from "react";
import { OrchidForm } from "@/components/molecules/OrchidForm";
import {
  OrchidFormState,
  updateOrchid,
} from "@/app/orchid-action/orchidActions";
import type { Tables } from "@/types/database.types";

interface EditOrchidFormProps {
  orchid: Tables<"plant-taxonomy">;
}
export default function EditOrchidForm({ orchid }: EditOrchidFormProps) {
  const initialState: OrchidFormState = {
    message: null,
    errors: {},
  };

  const [state, dispatch, isPending] = useActionState(
    updateOrchid,
    initialState
  );

  return (
    <OrchidForm
      initialData={orchid}
      onSubmit={dispatch}
      isPending={isPending}
      state={state}
      title="Modifica Orchidea"
      submitButtonText="Salva modifiche"
      loadingText="Aggiornamento in corso..."
    />
  );
}
