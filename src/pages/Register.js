import React, { useState } from "react";
import { auth } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Registration successful! You can now log in.");
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email.");
      } else {
        setError("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#4d4d61" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "70%", maxWidth: "550px" }}
      >
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
          {error && <div className="text-danger">{error}</div>}
          {successMessage && (
            <div className="text-success">{successMessage}</div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
