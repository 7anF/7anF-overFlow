import TagCard from "@/components/cards/TagCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import SearchLocally from "@/components/shared/search/SearchLocally";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async () => {
  const tags = await getAllTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocally
          placeholder="Search for tags..."
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filters
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagCard
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              questions={tag.questions}
            />
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description=" It looks like there are no tags available at the moment. 😕 Be a trendsetter by asking a question and creating a tag that best represents your topic of interest. 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default page;
