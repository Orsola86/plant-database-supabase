import { redirect } from "next/navigation";
import { getCollection } from "../actions";
import UploadInput from "@/src/components/upload-input";
import { createClient } from "@/src/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const orchids = await getCollection();

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      {orchids?.map((orchid) => <div key={orchid.id}>{orchid.species}</div>)}
      <UploadInput />
    </div>
  );
}
