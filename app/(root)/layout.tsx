import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar/Navbar";
import RightNavbar from "@/components/shared/RightNavbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative flex flex-col">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>{" "}
        <RightNavbar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
