import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    // mock authentication
    setTimeout(() => {
      setLoading(false);
      if (email.includes("@")) {
        const user = { name: "Aayush Kattel", email };
        onLogin(user);
        nav("/books");
      } else {
        setErr("Invalid email");
      }
    }, 700);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-4 text-center">
            <div className="text-xl font-semibold">Library Management System</div>
            <div className="text-sm text-gray-500">Login to Your Account</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-600 text-sm">Email</span>
              <input
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-600 text-sm">Password</span>
              <input
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••"
                type="password"
                required
              />
            </label>

            {err && <div className="text-red-500 text-sm">{err}</div>}

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
