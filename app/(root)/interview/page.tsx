import Agent from "@/components/ai-agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Interview = async () => {
  const user = await getCurrentUser();

  console.log("User Data: ", user);

  if (!user || !user.id) {
    console.log("User not found or ID is missing");
    return <p className="text-center text-gray-600">Please log in first.</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-semibold">Interview Generation</h3>
      <Agent userName={user.name} userId={user.id} type="generate" />
    </div>
  );
};

export default Interview;
