import { useRef } from "react";

export function InputBox({innerRef, label, placeholder }) {
  const ref = useRef("");
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        ref={innerRef}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
