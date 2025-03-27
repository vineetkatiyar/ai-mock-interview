import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    console.log("No user ID found");
    return <p>Please log in to view your interviews.</p>;
  }

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(userId),
    getLatestInterviews({ userId }),
  ]);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (allInterview?.length ?? 0) > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <section className="relative w-full bg-black text-white dark:bg-gray-900 rounded-xl p-6 md:p-8 flex items-center justify-between min-h-[180px]">
        <div className="max-w-lg space-y-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Master Interviews with AI
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Practice real questions and receive instant feedback.
          </p>
          <Button
            asChild
            className="mt-3 bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 max-sm:w-full"
          >
            <Link href="/interview">Start Now</Link>
          </Button>
        </div>
        <div className="mt-4 md:mt-0">
          <Image
            src="/robot.png"
            alt="robot image"
            width={120}
            height={120}
            className="grayscale opacity-80 max-sm:hidden"
          />
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Your Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* Take an Interview Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Take an Interview
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-start gap-6 w-full">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 w-full text-center py-10">
              There are no interviews available
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
