import React from "react";

export default function PlantCollectionSkeleton() {
  return (
    <div className="animate-pulse default-grid">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="col-span-full rounded-2xl bg-gray-200 p-4 md:col-span-6 lg:col-span-4"
        >
          <div className="mb-4 h-48 rounded-xl bg-gray-300"></div>
          <div className="mb-2 h-4 rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
