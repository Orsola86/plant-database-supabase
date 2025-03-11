import React from "react";
import { Text } from "../Text/Text";

export const FormMessage = ({ error }: { error: string }) => {
  return (
    <Text styledAs="caption-sm-regular" className="text-red-500" key={error}>
      {error}
    </Text>
  );
};
