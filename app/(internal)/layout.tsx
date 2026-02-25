// app/(internal)/layout.tsx
import Header from "@/components/layout/Header";
import BottomNavbar from "@/components/layout/BottomNavbar";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <main>{children}</main>
      <BottomNavbar />
    </section>
  );
}
