export default function isExternalUrl(url: string | unknown): boolean {
  return (
    typeof url === "string" &&
    url !== "" &&
    !(url?.startsWith("/") || url?.startsWith("#"))
  );
}
