import React from "react";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-3">
        {/* Placeholder image. Replace book.cover with actual image URL */}
        <div className="text-gray-400 text-sm">Cover</div>
      </div>
      <div className="font-semibold">{book.title}</div>
      <div className="text-sm text-gray-500">{book.author}</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-gray-600">{book.available} available</div>
        <button className="text-sm px-3 py-1 rounded-md border">Reserve</button>
      </div>
    </div>
  );
}
