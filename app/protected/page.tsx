import UploadInput from "@/components/upload-input";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
  console.log("🚀 ~ ProtectedPage ~ orchids:", orchids);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {orchids?.map((orchid) => <div key={orchid.id}>{orchid.species}</div>)}
      <UploadInput />
    </div>
  );
}
