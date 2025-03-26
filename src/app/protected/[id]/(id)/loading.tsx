import { Card, CardContent } from "@/components/molecules/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container animate-pulse py-12">
        <div className="mb-8 flex gap-4 md:flex-row">
          <div className="h-10 w-32 rounded-lg" />
          <div className="ml-auto h-10 w-32 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square w-full rounded-2xl shadow-xl" />
          <div className="space-y-8">
            <div>
              <div className="mb-2 h-6 w-48" />
              <div className="mb-2 h-8 w-64" />
              <div className="h-5 w-32" />
            </div>
            <div className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 w-24" />
                      <div className="h-6 w-40" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
