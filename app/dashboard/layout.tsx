import { Menu } from "@/components/layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Menu />
      {children}
    </div>
  );
}
