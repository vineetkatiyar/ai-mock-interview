import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  if (!user?.id) {
    redirect("/login");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  return (
    <section className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl mt-10 space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-semibol">
          Feedback on the
          <span className="capitalize text-cyan-700">{interview.role}</span>
          Interview
        </h1>
      </div>

      {/* Feedback Details */}
      <div className="flex flex-wrap justify-center gap-6 text-gray-700 bg-amber-600 rounded-2xl">
        {/* Overall Impression */}
        <div className="flex items-center gap-2 p-3 rounded-lg shadow">
          <Image src="/star.svg" width={22} height={22} alt="star" />
          <p className="font-medium">
            Overall Impression:{" "}
            <span className="text-cyan-700 font-bold">
              {feedback?.totalScore}
            </span>
            /100
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 p-3  rounded-lg shadow">
          <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
          <p>
            {feedback?.createdAt
              ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
              : "N/A"}
          </p>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Final Assessment */}
      <p className=" text-lg italic text-center">
        {feedback?.finalAssessment}
      </p>

      {/* Interview Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold ">
          Breakdown of the Interview:
        </h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="font-bold text-gray-900">
              {index + 1}. {category.name}{" "}
              <span className="text-cyan-700">({category.score}/100)</span>
            </p>
            <p className="text-gray-600">{category.comment}</p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-green-700">Strengths</h3>
        <ul className="list-disc pl-5 ">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-red-600">
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-5 ">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button className=" hover:bg-gray-300 font-semibold px-6 py-2 rounded-lg w-full sm:w-auto">
            Back to Dashboard
          </Button>
        </Link>

        <Link href={`/interview/${id}`}>
          <Button className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto">
            Retake Interview
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Feedback;
