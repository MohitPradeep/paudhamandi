import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [disabled, setIsDisabled] = useState(true)
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // password set
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const trimmedPassword = newPassword.trim(); // Trim spaces from the beginning and end
      setPassword(trimmedPassword);
  };

  useEffect(() => {
    if(password.length < 8) setIsDisabled(true)
    else setIsDisabled(false)
  }, [password])

  // phone number set
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    // Remove any non-numeric characters
    const numericPhone = newPhone.replace(/\D/g, '');
    // Check if the phone number has exactly 10 digits
    if (numericPhone.length <= 10) {
      setPhone(numericPhone);
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {password.length > 0 && password.length < 8 && (
              <div className="invalid-feedback">Password must be at least 8 characters long.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              required
            />
            {phone.length > 0 && phone.length !== 10 && (
              <div className="invalid-feedback">Phone number must be exactly 10 digits.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is your favorite sport?"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
