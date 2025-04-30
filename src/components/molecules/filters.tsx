"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/button";

export default function Filters({
  families,
  genera,
}: {
  families: (string | null)[];
  genera: (string | null)[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = useDebouncedCallback((filterType, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value && value !== "all") {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearFilters = () => {
    const params = new URLSearchParams();
    const query = searchParams.get("query");
    if (query) {
      params.set("query", query);
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-col md:gap-2">
          <label
            htmlFor="family-filter"
            className="text-[1.4rem] font-medium text-gray-700"
          >
            Famiglia
          </label>
          <select
            id="family-filter"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-[1.4rem] text-gray-800
              shadow-sm focus:border-primary focus:outline-none focus:ring-2
              focus:ring-primary/30"
            onChange={(e) => handleFilterChange("family", e.target.value)}
            value={searchParams.get("family") || ""}
          >
            <option value="all">Tutte le famiglie</option>
            {families.filter(Boolean).map((family) => (
              <option key={family} value={family || ""}>
                {family}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:gap-2">
          <label
            htmlFor="genus-filter"
            className="text-[1.4rem] font-medium text-gray-700"
          >
            Genere
          </label>
          <select
            id="genus-filter"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-[1.4rem] text-gray-800
              shadow-sm focus:border-primary focus:outline-none focus:ring-2
              focus:ring-primary/30"
            onChange={(e) => handleFilterChange("genus", e.target.value)}
            value={searchParams.get("genus") || ""}
          >
            <option value="all">Tutti i generi</option>
            {genera.filter(Boolean).map((genus) => (
              <option key={genus} value={genus || ""}>
                {genus}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-2 w-full md:ml-4 md:mt-0 md:w-auto"
        onClick={clearFilters}
      >
        Reset filtri
      </Button>
    </div>
  );
}
