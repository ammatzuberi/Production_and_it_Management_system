import { Container } from "react-bootstrap";
import "./App.css";
import { AuthProvider } from "./Component/context/AuthContext";
import Production from "./Component/Production/Production";
import Demo from "./Demo";
import { useAuth } from "./Component/context/AuthContext";
import Signup from "./Signup";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { useState } from "react";
import Nav from "./Nav";
import Test from "./Test";
import Textmessage from "./Textmessage";
import Edit from "./Edit";

function App() {
  var email = localStorage.getItem("Email");

  // useEffect(()=>{
  //   const  email=JSON.parse(localStorage.getItem("Email" ,JSON.stringify("Email")))
  //   if(email){
  //     setItems(email)

  //   }
  //   console.log(items)

  // },[])

  // const currentUser = useAuth();
  // console.log(currentUser?.email);

  return (
    <>
      {/* <Textmessage /> */}
      {/* <Container> */}

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                email != null ? (
                  <Production />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={
                email == null ? <Login /> : <Navigate to="/" replace={true} />
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <Test /> */}

      {/* </Container> */}
      {/* <Production/> */}
      {/* <Demo /> */}
    </>
  );
}

export default App;
