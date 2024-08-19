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
  return <main className="flex-center min-h-screen w-full">{children}</main>;
};

export default Layout;
