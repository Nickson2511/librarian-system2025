import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { ReactNode } from "react";

const LibrarianLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex flex-1 flex-col sm:flex-row">
      <Sidebar />
      <main className="flex-1 bg-gray-900 p-4">{children}</main>
    </div>
    <Footer />
  </div>
);

export default LibrarianLayout;
