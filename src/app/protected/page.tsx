import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import UploadInput from "@/components/atoms/upload-input";
import { getCollection } from "../actions";

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
