"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { sidebarLinks } from "@/constants/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  let isActive = false;

  return (
    <section className="flex flex-col justify-between background-light900_dark200 sticky left-0 top-0 h-screen w-fit overflow-y-auto p-6 pt-36 custom-scrollbar light-border border-r shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              null;
            }
          }
          return (
            <div key={item.route}>
              <Link
                href={item.route}
                className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex-start gap-4 bg-transparent p-4 max-lg:flex-center`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text-stone-300">
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient">
                  <p className="max-lg:hidden">Log In</p>
                  <Image
                    src="/assets/icons/account.svg"
                    alt="login"
                    width={20}
                    height={20}
                    className={`${isActive ? "" : "invert-colors"} lg:hidden`}
                  />
                </span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900 border border-light-400">
                <p className="max-lg:hidden">Sign up</p>
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign up"
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"} lg:hidden`}
                />
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;
