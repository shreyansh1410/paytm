import React from "react";

export const Appbar = () => {
  return (
    <div className="h-max p-4 px-6">
      <div className="flex flex-row justify-between items-center text-2xl">
        <div className="font-bold text-3xl">BillBlitz</div>
        <div className="flex flex-row items-center">
          <div className="font-normal px-2">
            <span>Hello </span>
            <span>User</span>
          </div>
          <div className="px-2">
            <img src="/user.png" alt="user" className="w-12 rounded-full"/>
          </div>
        </div>
      </div>
    </div>
  );
};
