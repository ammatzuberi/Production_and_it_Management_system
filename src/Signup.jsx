import { Form, Button, Card, Alert } from "react-bootstrap";

import { useAuth } from "./Component/context/AuthContext";
import Production from "./Component/Production/Production";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "./Firebase";
import firebase from "firebase/compat/app";
import { collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { display } from "@mui/system";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const DepartmentRef = useRef();
  const { signup, currentUser } = useAuth();
  const [loading, setLoading] = useState();

  const [error, setError] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [email, setEmail] = useState({
    email: "",
  });
  let name, value;
  const userEmail = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmail({ ...email, [name]: value });
  };

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    console.log(event.target.value);

    // firebase.().ref("users").set(event.target.value);
  };
  const roleFunction = (e) => {
    e.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      // history.push("/");
    } catch {
      setError("Failed to create an account Please Enter A Strong Password");
    }

    setLoading(false);

    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    console.log(queryData);
    queryData.map(async (v) => {
      // console.log(v )
      await setDoc(doc(db, "users", email.email), {
        Email: email.email,
        Password: passwordRef.current.value,
        Department: selectValue,
      });
    });
  }

  return (
    <>
      <div
        className="SignupContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="SignupDiv">
          <div className="InnerContainerSignup">
            <Card
              className="signupform"
              style={{
                display: "flex",
                flexDirection: "row",
                background: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Body>
                <h2
                  className="text-center mb-4"
                  style={{ position: "absolute", top: "0" }}
                >
                  Sign Up
                </h2>
                {/* {currentUser && currentUser.email} */}
                {error && <Alert variant="danger">{error} </Alert>}
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Group id="email">
                    <Form.Label
                      style={{ position: "absolute", marginRight: "10px" }}
                    >
                      <MdEmail />
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      ref={emailRef}
                      required
                      value={email.email}
                      onChange={userEmail}
                      placeholder="Enter Email"
                      style={{
                        border: "none",
                        paddingLeft: "30px",

                        borderBottom: "1px solid #999",
                        borderRadius: "0px",
                        fontFamily: "Poppins !important",
                        marginBottom: "20px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label
                      style={{ position: "absolute", marginRight: "10px" }}
                    >
                      <RiLockPasswordLine />
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Enter Password"
                      style={{
                        border: "none",
                        paddingLeft: "30px",

                        borderBottom: "1px solid #999",
                        borderRadius: "0px",
                        fontFamily: "Poppins !important",
                        marginBottom: "20px",
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label
                      style={{ position: "absolute", marginRight: "10px" }}
                    >
                      <RiLockPasswordFill />
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      placeholder="Confirm Password"
                      style={{
                        border: "none",
                        paddingLeft: "30px",

                        borderBottom: "1px solid #999",
                        borderRadius: "0px",
                        fontFamily: "Poppins !important",
                        marginBottom: "20px",
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      Department:
                    </Form.Label>

                    <select
                      value={selectValue}
                      onChange={handleChange}
                      style={{
                        marginLeft: "10px",
                        height: "30px ",
                        marginBottom: "20px",
                      }}
                      required
                    >
                      <option>Select</option>
                      <option value="Production">Production</option>
                      <option value="IT Department">IT Department</option>
                    </select>
                    {/* <Form.Control type="text" ref={DepartmentRef} required /> */}
                  </Form.Group>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-100 "
                    style={{ marginBottom: "10px" }}
                  >
                    Sign Up
                  </Button>
                </Form>
                <div className="w-100 text-center ">
                  Already have an account? <Link to="/login">Log In</Link>
                </div>
              </Card.Body>
            </Card>

            <div>
              <img
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
