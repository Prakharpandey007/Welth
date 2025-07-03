
import "../../app/globals.css";
import AppShell from "@/components/AppShell";

export default function MainLayout({ children }) {
  return (
    <AppShell>
      <div className="container mx-auto my-32">{children}</div>
    </AppShell>
  );
}
