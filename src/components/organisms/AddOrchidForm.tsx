"use client";

import { useActionState } from "react";
import { OrchidForm } from "@/components/molecules/OrchidForm";
import { OrchidFormState, addOrchid } from "@/app/orchid-action/orchidActions";

export default function AddOrchidForm() {
  const initialState: OrchidFormState = {
    message: null,
    errors: {},
  };

  const [state, dispatch, isPending] = useActionState(addOrchid, initialState);

  return (
    <OrchidForm
      onSubmit={dispatch}
      isPending={isPending}
      state={state}
      title="Aggiungi Orchidea"
      submitButtonText="Aggiungi orchidea"
      loadingText="Caricamento in corso..."
    />
  );
}
