import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { createServerClient } from "@supabase/ssr";

// Questa funzione NON deve essere chiamata dentro funzioni in cache
export const getCookieStore = () => {
  return cookies();
};

// Crea il client Supabase con i cookie forniti
export const createClientWithCookies = (
  cookieStore: ReadonlyRequestCookies
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Ignora gli errori in ambiente server
          }
        },
      },
    }
  );
};

// Funzione wrapper per utilizzo semplificato
export const createClient = async () => {
  const cookieStore = await getCookieStore();
  return createClientWithCookies(cookieStore);
};
