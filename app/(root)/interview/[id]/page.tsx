import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/components/display-tech-icons";
import Agent from "@/components/ai-agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const InterviewByIdPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) {
    return redirect("/");
  }

  return (
    <>
      <div className="mx-5 p-5 border flex justify-between items-end rounded-2xl px-10">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={50}
            height={50}
            className="rounded-lg object-cover"
          />
          <h3 className="text-lg font-semibold ">{interview.role}</h3>
          {/* Tech Stack Icons */}
          <div className="mt-4">
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
        </div>

        {/* Interview Type */}
        <p className="text-xl bg-green-500 p-2 rounded-2xl">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewByIdPage;
