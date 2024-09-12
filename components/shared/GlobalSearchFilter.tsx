"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const GlobalSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("type");

  const [filter, setFilter] = useState(query || "");

  useEffect(() => {
    if (filter) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: filter,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keys: ["type"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [filter, router, searchParams]);

  const active = filter;
  const ToggleFilter = (filter: string) => {
    if (active === filter) {
      setFilter("");
    } else {
      setFilter(filter);
    }
  };

  return (
    <div className="flex gap-3">
      {GlobalSearchFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {
            ToggleFilter(item.value);
          }}
          className={`small-medium rounded-3xl px-5 py-2 capitalize shadow-none ${active === item.value ? "primary-gradient text-light-900" : "bg-light-700 text-dark-500 dark:text-light-800 hover:text-primary-500 dark:bg-dark-300 hover:dark:text-primary-500"}`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default GlobalSearchFilter;
