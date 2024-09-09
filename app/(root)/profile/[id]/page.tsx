import AnswerCard from "@/components/cards/AnswerCard";
import Stats from "@/components/shared/Stats";
import QuestionCard from "@/components/cards/QuestionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { formatDateToMonthYear } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProfileMetric from "@/components/shared/ProfileMetric";
import QuestionTab from "@/components/shared/QuestionTab";
import { URLProps } from "@/types";
import AnswerTab from "@/components/shared/AnswerTab";

const page = async ({ params, searchParams }: URLProps) => {
  const { userId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  return (
    <>
      <div className="flex max-sm:flex-col-reverse justify-between items-start gap-5">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            width={140}
            height={140}
            alt="profile picture"
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h1 className="h1-bold text-dark100_light900">
              {userInfo.user.name}
            </h1>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileMetric
                  imgUlr="/assets/icons/link.svg"
                  alt="prtofolio websites"
                  title="Portfolio"
                  href={userInfo.user.portfolioWebsite}
                />
              )}
              {userInfo.user.location && (
                <ProfileMetric
                  imgUlr="/assets/icons/location.svg"
                  alt="location"
                  title={userInfo.user.location}
                />
              )}
              <ProfileMetric
                imgUlr="/assets/icons/calendar.svg"
                alt="joinedAt"
                title={`Joined ${formatDateToMonthYear(userInfo.user.joinedAt)}`}
              />
            </div>

            {userInfo.user.bio && (
              <div className="mt-8 paragraph-regular text-dark400_light800">
                <p>{userInfo.user.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {userId === userInfo.user.clerkId && (
              <Link href={`/profile/edit`}>
                <Button className="background-light800_dark400 border light-border paragraph-medium text-dark300_light900 flex-center px-4 py-3 min-h-[46px] min-w-[175px]">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={userInfo.totalQuestion}
        totalAnswers={userInfo.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs
          defaultValue="top-posts"
          className="
        flex-1"
        >
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <div className="mt-5 flex flex-col gap-5">
              <QuestionTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={userId}
              />
            </div>
          </TabsContent>
          <TabsContent value="answers">
            <div className="mt-5 flex flex-col gap-5">
              <AnswerTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={userId}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
