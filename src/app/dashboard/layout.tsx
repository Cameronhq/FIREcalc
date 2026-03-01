export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-container px-4 sm:px-page-px py-6 sm:py-10">
        {children}
      </div>
    </div>
  );
}
