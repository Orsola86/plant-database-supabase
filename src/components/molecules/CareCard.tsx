import { icons } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/atoms/Text/Text";
import { Card, CardContent } from "./card";

export const CareCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: {
    color: "blue" | "green" | "red" | "purple";
    name: keyof typeof icons;
  };
}) => {
  const { name, color } = icon || {};
  const LucideIcon = icons[name];
  return (
    <Card>
      <CardContent className="flex items-center space-x-3 p-4">
        <div
          className={cn("rounded-full p-2", {
            "bg-blue-100": color === "blue",
            "bg-green-100": color === "green",
            "bg-red-100": color === "red",
            "bg-purple-100": color === "purple",
          })}
        >
          <LucideIcon
            size={24}
            className={cn("", {
              "text-blue-700": color === "blue",
              "text-green-700": color === "green",
              "text-red-700": color === "red",
              "text-purple-700": color === "purple",
            })}
          />
        </div>
        <div>
          <Text styledAs="caption-md-bold">{title}</Text>
          <Text styledAs="caption-sm-regular">{description}</Text>
        </div>
      </CardContent>
    </Card>
  );
};
