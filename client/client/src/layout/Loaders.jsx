import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <div className="grid grid-cols-12 h-[calc(100vh-4rem)] space-x-4">
      <div className="hidden sm:block sm:col-span-4 md:col-span-3 h-full">
        <div className="bg-gray-200 animate-pulse h-full"></div>
      </div>

      {/* <!-- Middle Section --> */}
      <div className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 h-full">
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse h-20 w-full rounded"
            ></div>
          ))}
        </div>
      </div>

      {/* <!-- Third Section --> */}
      <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full ">
        <div className="bg-gray-200 animate-pulse h-[100vh] w-full"></div>
      </div>
    </div>
  );
};
