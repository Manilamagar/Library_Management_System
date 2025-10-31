import React from "react";

export default function UserModal({ open, user, onClose, onLogout }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-lg p-6 z-10 w-full max-w-sm">
        <div className="text-lg font-semibold mb-2">{user?.name}</div>
        <div className="text-sm text-gray-600 mb-4">{user?.email}</div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1 rounded-md border">Close</button>
          <button onClick={onLogout} className="px-4 py-1 rounded-md bg-blue-600 text-white">Logout</button>
        </div>
      </div>
    </div>
  );
}
