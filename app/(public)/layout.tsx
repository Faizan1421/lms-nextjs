import { Navbar } from './_components/Navbar';

export default function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 lg:px-8">{children}</main>
    </div>
  );
}
