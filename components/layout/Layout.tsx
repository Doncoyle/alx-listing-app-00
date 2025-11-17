import type { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

