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
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <label htmlFor="family-filter" className="text-[1.4rem] font-medium">
          Family:
        </label>
        <select
          id="family-filter"
          className="rounded-md border border-gray-200 px-2 py-1 text-[1.4rem]"
          onChange={(e) => handleFilterChange("family", e.target.value)}
          value={searchParams.get("family") || ""}
        >
          <option value="all">All Families</option>
          {families.filter(Boolean).map((family) => (
            <option key={family} value={family || ""}>
              {family}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <label htmlFor="genus-filter" className="text-[1.4rem] font-medium">
          Genus:
        </label>
        <select
          id="genus-filter"
          className="rounded-md border border-gray-200 px-2 py-1 text-[1.4rem]"
          onChange={(e) => handleFilterChange("genus", e.target.value)}
          value={searchParams.get("genus") || ""}
        >
          <option value="all">All Genera</option>
          {genera.filter(Boolean).map((genus) => (
            <option key={genus} value={genus || ""}>
              {genus}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="outline"
        className="mt-2 md:ml-auto md:mt-0"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
