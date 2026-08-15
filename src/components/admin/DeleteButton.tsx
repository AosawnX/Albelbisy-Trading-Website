"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({ confirmMessage }: { confirmMessage?: string }) {
  return (
    <button
      type="submit"
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
      onClick={(e) => {
        if (confirmMessage && !confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={15} />
    </button>
  );
}
