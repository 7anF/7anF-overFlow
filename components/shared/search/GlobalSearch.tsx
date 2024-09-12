"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import GlobalResults from "./GlobalResults";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");
  const searchContaoinerRef = useRef(null);

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (e: any) => {
      if (
        searchContaoinerRef.current &&
        // @ts-ignore
        !searchContaoinerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutSideClick);

    return () => document.addEventListener("click", handleOutSideClick);
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, query]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
        ref={searchContaoinerRef}
      >
        <Image
          src="assets/icons/search.svg"
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search for anything..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder bg-transparent text-dark400_light700 border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResults />}
    </div>
  );
};

export default GlobalSearch;
