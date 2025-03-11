export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container flex h-full items-center">{children}</main>;
}
