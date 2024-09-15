import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign-in",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex-center min-h-screen w-full dark:bg-auth-dark dark:bg-center dark:bg-cover bg-auth-light bg-center bg-cover max-sm:dark:bg-contain max-sm:bg-contain">
      {children}
    </main>
  );
};

export default Layout;
