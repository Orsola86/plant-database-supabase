export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container h-full py-16">
      <div className="default-grid">
        <div className="col-span-full md:col-span-6 md:col-start-4">
          {children}
        </div>
      </div>
    </main>
  );
}
