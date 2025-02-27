import React from "react";
import { Avatar } from "@mui/material"
import { transformImage } from "../lib/features";

// Todo Transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <div className="flex space-x-1">
      <div className="relative w-20 h-12">
        {avatar.slice(0, max).map((src, index) => (
          <img
            key={index}
            src={transformImage(src)}
            alt={`Avatar ${index}`}
            className={`absolute w-12 h-12 rounded-full object-cover border-2 border-white shadow-md`}
            style={{
              left: `${index * 12}px`,
            }}
          />
        ))}
        {avatar.length > max && (
          <div
            className="absolute w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
            style={{ left: `${max * 12}px` }}
          >
            +{avatar.length - max}
          </div>
        )}
      </div>
    </div>
  );
};


export default AvatarCard;
