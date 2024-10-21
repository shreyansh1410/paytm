import React from "react";

export const Appbar = ({ firstName }) => {
  return (
    <div className="h-max p-4 px-6 border-b-2 border-gray-400">
      <div className="flex flex-row justify-between items-center text-2xl">
        <div className="font-bold text-3xl">BillBlitz</div>
        <div className="flex flex-row items-center">
          <div className="font-normal px-2 flex flex-row justify-center items-center">
            <div className="mr-2">Hello, </div>
            <div className="mr-4">{firstName}</div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {firstName[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
