import { getTechIcons } from "@/lib/utils";
import { TechIconProps } from "@/types";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechIcons(techStack);

  return (
     <div className="flex gap-3">
     {techIcons.slice(0, 3).map(({ tech, url }) => (
       <div key={tech} className="relative group">
         {/* Tech Name - Hidden by Default, Shown on Hover */}
         <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
           {tech}
         </span>
   
         {/* Tech Icon */}
         <Image src={url} alt={tech} width={20} height={20} className="cursor-pointer" />
       </div>
     ))}
   </div>
   
  );
};

export default DisplayTechIcons;
