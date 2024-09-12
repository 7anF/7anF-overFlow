"use client";

import React, { useEffect, useState } from "react";
import GlobalSearchFilter from "../GlobalSearchFilter";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResults = () => {
  const searchParams = useSearchParams();
  const [isloading, setIsloading] = useState(false);
  const [results, setResults] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      setIsloading(true);

      try {
        // fetch from the global search action
        const res = await globalSearch({
          query: global,
          type,
        });

        setResults(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsloading(false);
      }
    };

    if (global) {
      fetchResults();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div className="w-[600px] absolute z-10 rounded-xl flex justify-center items-start background-light800_dark400 shadow-sm flex-col p-4 mt-3">
      <div className="flex-center gap-5">
        <p className="body-medium text-dark400_light800">Type:</p>
        <GlobalSearchFilter />
      </div>

      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5 w-full">
        <p className="text-dark400_light900 paragraph-semibold">Top Match</p>

        {isloading ? (
          <div className="w-full flex-center flex-col">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark300_light800 body-regular">
              Browsing the whole database..
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {results.length > 0 ? (
              results.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + index}
                  className="flex gap-3 w-full cursor-pointer py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50 rounded-xl px-1 items-start"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col">
                <p className="text-dark200_light800 body-regular py-2.5">
                  Oops, no results found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResults;
