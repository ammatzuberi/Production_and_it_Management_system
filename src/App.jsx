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
import PrivateRouter from "./PrivateRouter";
import Nouser from "./Nouser";
import Signup_validation from "./Signup_validation";

function App() {
  return (
    <>
      {/* <Textmessage /> */}
      {/* <Container> */}

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRouter />}>
              <Route exact path="/Dashboard" Component={Production} />
            </Route>
            <Route element={<Nouser />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<Signup_validation />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
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
