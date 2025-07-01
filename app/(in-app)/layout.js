import Header from "@/components/header";
import "../../app/globals.css";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <footer className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Made with 💗 by IIIT-RANCHI</p>
        </div>
      </footer>
    </>
  );
}
