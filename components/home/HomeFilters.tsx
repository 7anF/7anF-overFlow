"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const HomeFilters = ({ route }: { route: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("filter");

  const [filter, setFilter] = useState(query || "");

  useEffect(() => {
    if (filter) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keys: ["filter"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [filter]);

  const active = filter;
  const ToggleFilter = (filter: string) => {
    if (active === filter) {
      setFilter("");
    } else {
      setFilter(filter);
    }
  };

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {
            ToggleFilter(item.value);
          }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400" : "bg-light-800 text-light-500 dark:text-light-500 dark:bg-dark-300 hover:text-primary-500 dark:hover:text-primary-500"}`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
