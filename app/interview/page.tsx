import AiAgent from "@/components/ai-agent";

const Interview = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-semibold">Interview Generation</h3>
      <AiAgent userName="You" userId="user1" type="generate" />
    </div>
  );
};

export default Interview;