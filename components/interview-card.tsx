import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Calculator, Star } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Feedback, InterviewCardProps } from "@/types";
import DisplayTechIcons from "./display-tech-icons";

const InterviewCard = ({
  interviewId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-[360px] max-sm:w-full min-h-96 rounded-3xl shadow-lg p-5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black transition-all hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        {/* Interview Type & Image */}
        <p className="text-sm uppercase w-full text-right">
          {normalizedType}
        </p>
        <Image
          src={getRandomInterviewCover()}
          alt="cover image"
          width={90}
          height={90}
          className="rounded-lg mt-2"
        />

        {/* Role Title */}
        <h3 className="font-bold text-2xl text-black dark:text-white mt-2">
          {role}
        </h3>

        {/* Date & Score Section */}
        <div className="flex justify-between w-full px-4 mt-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calculator className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <p className="text-sm">{formatDate}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Star className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <p className="text-sm">{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        {/* Final Assessment */}
        <p className="text-sm mt-4 px-2 text-gray-600 dark:text-gray-400">
          {feedback?.finalAssessment ||
            "You haven't taken any interview yet. Take it now to improve your skills."}
        </p>

        {/* Tech Icons & Button */}
        <div className="flex flex-col items-center mt-6 w-full">
          <div className="flex justify-center w-full">
            <DisplayTechIcons
              techStack={techstack}
              // className="grayscale hover:grayscale-0 transition-all flex-wrap justify-center"
            />
          </div>
          <Button className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 mt-4">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
