import React, { useContext, useState } from "react";
import "./Signin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import Switch from "@mui/material/Switch";   // Updated Material UI import

function Signin() {
  const [isStudent, setIsStudent] = useState(true);
  const [admissionId, setAdmissionId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  // FIX: Avoid ESLint error & ensure fallback
 // const API_URL = import.meta.env?.VITE_API_URL ||
                 // (typeof process !== "undefined" ? process.env?.REACT_APP_API_URL : undefined) ||
                 // "http://localhost:3002/";

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });

//     try {
//       const res = await axios.post(`${API_URL}api/auth/signin`, userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//       setError("Wrong Username or Password");
//     }
 };

  const handleForm = (e) => {
    e.preventDefault();

    if (isStudent) {
      loginCall({ admissionId, password }, dispatch);
    } else {
      loginCall({ employeeId, password }, dispatch);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title">Log In</h2>
          <p className="line"></p>

          <div className="persontype-question">
            <p>Are you a Staff member?</p>
            <Switch
              checked={!isStudent}
              onChange={() => setIsStudent(!isStudent)}
              color="primary"
            />
          </div>

          <div className="error-message">
            <p>{error}</p>
          </div>

          <div className="signin-fields">
            <label htmlFor={isStudent ? "admissionId" : "employeeId"}>
              <b>{isStudent ? "Admission ID" : "Employee ID"}</b>
            </label>

            <input
              className="signin-textbox"
              type="text"
              placeholder={
                isStudent ? "Enter Admission ID" : "Enter Employee ID"
              }
              required
              onChange={(e) =>
                isStudent
                  ? setAdmissionId(e.target.value)
                  : setEmployeeId(e.target.value)
              }
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signin-button">Log In</button>

          <a className="forget-pass" href="#">
            Forgot password?
          </a>
        </form>

        <div className="signup-option">
          <p className="signup-question">
            Don't have an account? Contact Librarian
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
