"use client";

import { useActionState } from "react";
import { OrchidFormState, addOrchid } from "@/app/orchid-action/orchidActions";
import { OrchidForm } from "../molecules/OrchidForm";

export default function AddOrchidForm() {
  const initialState: OrchidFormState = {
    message: null,
    errors: {},
  };

  const [state, dispatch, isPending] = useActionState(addOrchid, initialState);

  return (
    <div className="rounded-xl border border-green-100 bg-white">
      <OrchidForm
        onSubmit={dispatch}
        isPending={isPending}
        state={state}
        title="Aggiungi Orchidea"
        submitButtonText="Aggiungi orchidea"
        loadingText="Caricamento in corso..."
      />
    </div>
  );
}
