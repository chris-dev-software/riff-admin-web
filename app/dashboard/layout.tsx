import { Menu } from "@/components/layout";
import { ApolloWrapper } from "@/utils/apollo/client";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloWrapper>
      <div className="grid grid-cols-[250px_1fr]">
        <Menu />
        {children}
      </div>
    </ApolloWrapper>
  );
}
