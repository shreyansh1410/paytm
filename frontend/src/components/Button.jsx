import React from "react";

export const Button = ({buttonText, onClick }) => {
  return (
    <div className="">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};
