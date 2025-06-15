import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main + Footer content wrapper */}
      <div className="flex-1 md:ml-[150px] flex flex-col min-h-screen">
        {/* Page content */}
        <main className="flex-grow">{children}</main>

        {/* Full-width footer (beside sidebar, not under it) */}
        <Footer />
      </div>
    </div>
  );
}
