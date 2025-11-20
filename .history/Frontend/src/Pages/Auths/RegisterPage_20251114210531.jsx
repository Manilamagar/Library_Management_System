import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setMessage("All fields are required!");
      return;
    }

    try {
  await axios.post("http://localhost:3002/api/register", formData);
  setMessage("User registered successfully!");
  setFormData({ name: "", email: "", password: "", role: "" });
} catch (error) {
  setMessage("Registration failed. Email may already exist.");
}
    

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Library Register</h2>

        {message && (
          <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Choose Role</label>
          <select
            name="role"
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Librarian">Librarian</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
