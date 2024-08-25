import Filters from "@/components/shared/Filters";
import HomeFilters from "@/components/home/HomeFilters";
import SearchLocally from "@/components/shared/search/SearchLocally";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "fgh456",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "Web Development" },
    ],
    author: {
      _id: "auth004",
      name: "John Doe",
      picture: "https://example.com/johndoe.jpg",
    },
    upvotes: 350,
    views: 1500000,
    answers: [
      {
        content: "Very insightful article.",
        author: "Alice",
        date: new Date("2024-08-10"),
      },
      {
        content: "Helped me understand ESNext features.",
        author: "Bob",
        date: new Date("2024-08-11"),
      },
    ],
    createdAt: new Date("2024-08-01T10:00:00Z"),
  },
  {
    _id: "ijk789",
    title: "Understanding React Hooks",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "Hooks" },
    ],
    author: {
      _id: "auth005",
      name: "Jane Smith",
      picture: "https://example.com/janesmith.jpg",
    },
    upvotes: 420,
    views: 8500,
    answers: [
      {
        content: "React Hooks are now clearer, thanks!",
        author: "Charlie",
        date: new Date("2024-08-12"),
      },
      {
        content: "Excellent explanation.",
        author: "David",
        date: new Date("2024-08-13"),
      },
    ],
    createdAt: new Date("2024-08-05T12:00:00Z"),
  },
  {
    _id: "lmn012",
    title: "A Deep Dive into TypeScript",
    tags: [
      { _id: "5", name: "TypeScript" },
      { _id: "6", name: "Type Safety" },
    ],
    author: {
      _id: "auth006",
      name: "Emily Davis",
      picture: "https://example.com/emilydavis.jpg",
    },
    upvotes: 480,
    views: 9200,
    answers: [
      {
        content: "TypeScript concepts explained well.",
        author: "Eve",
        date: new Date("2024-08-14"),
      },
      {
        content: "Cleared up my doubts about TypeScript.",
        author: "Frank",
        date: new Date("2024-08-15"),
      },
    ],
    createdAt: new Date("2024-08-10T14:30:00Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocally
          route="/"
          iconPosition="left"
          placeholder="Search questions..."
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />

        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-11 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
