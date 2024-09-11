import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/shared/Filters";
import SearchLocally from "@/components/shared/search/SearchLocally";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const Users = await getAllUsers({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocally
          placeholder="Search by username..."
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {Users.length > 0 ? (
          Users.map((user) => (
            <UserCard
              key={user._id}
              _id={user._id}
              clerkId={user.clerkId}
              name={user.name}
              username={user.username}
              picture={user.picture}
            />
          ))
        ) : (
          <div className="paragraph-regular text0dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
