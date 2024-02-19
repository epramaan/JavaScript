import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";

// s
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Pages/SignUp";
import Resources from "./Pages/Resources";
import Downloads from "./Pages/Downloads";
import FAQs from "./Pages/FAQs";
import { LoginSuccessful } from "./Pages/LoginSuccessful";
import AnyPage from "./Pages/AnyPage";
import Logout from "./Pages/Logout";



function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signUp" element={<Signup />} />
          <Route exact path="/resources" element={<Resources />}></Route>
          <Route exact path="/downloads" element={<Downloads />}></Route>
          <Route exact path="/FAQs" element={<FAQs />}></Route>
          {/* <Route path="/loginSuccessful" element={<LoginSuccessful />}></Route> */}
          <Route path="/loginSuccessful" element={<AnyPage />}></Route>
          {/* <Route path="/:code/:state" exact><LoginSuccessful /></Route> */}
          {/* <Route path="loginSuccessful/:code/:state" exact><LoginSuccessful /></Route> */}
          {/* <Route path="/loginSuccessful/:code/:state" exact component={<LoginSuccessful />} />; */}
          <Route exact path="/logout"  element={<Logout />}></Route>


        </Routes>

      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
