"use client";

import { useActionState } from "react";
import { FormInput } from "@/components//atoms/inputs/FormInput";
import { Button } from "@/components/atoms/button";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Card, CardContent } from "@/components/molecules/card";
import { addOrchid } from "@/app/orchid-action/orchidActions";

export default function AddOrchidForm() {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useActionState(addOrchid, initialState);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={dispatch} className="space-y-6">
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
            />
          </div>

          {state?.message && (
            <div className="rounded-md bg-red-50 p-4">
              <FormMessage error={state?.message} />
            </div>
          )}

          <Button type="submit">Aggiungi orchidea</Button>
        </form>
      </CardContent>
    </Card>
  );
}
