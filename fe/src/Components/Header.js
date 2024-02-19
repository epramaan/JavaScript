import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const styles = {
  title: {
    fontFamily: "Courier New",
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "white",
    marginLeft: "25px",
    marginRight: "30px",
    padding: "0",
  },
  login: {
    fontFamily: "Courier New",
    marginLeft: "0",
    marginRight: "-5",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
  signup: {
    fontFamily: "Courier New",
    margin: "0",
    marginRight: "55px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
  logo: {
    marginLeft: "5px",
    width: "200px",
    height: "50px",
  },
  userlogo: {
    marginLeft: "0px",
    width: "30px",
    height: "30px",
    marginTop: "7px",
  },
  navbar: {
    backgroundColor: "#800000",  //#5C0632
    position: "top",
  },
};
const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-md navbar-light " style={styles.navbar}>
        <div class="container-fluid topcolor">
          <a href="/" class="navbar-brand">
           
          </a>
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
              <a href="/" class="nav-item nav-link active" style={styles.title}>
                Home
              </a>
              <a href="/about" class="nav-item nav-link" style={styles.title}>
                About
              </a>
              <a href="/resources" class="nav-item nav-link" style={styles.title}>
                Resources
              </a>
              <a href="/downloads" class="nav-item nav-link" style={styles.title}>
                Downloads
              </a>
              <a href="/FAQs" class="nav-item nav-link" style={styles.title}>
                FAQs
              </a>
            </div>
            <div class="navbar-nav ms-auto">
              <a href="/login">
                <img
                  src={require("./images/profilepic1.png")}
                  style={styles.userlogo}
                  alt="CoolBrand"
                />
              </a>
              <a href="/login" style={styles.login} class="nav-item nav-link">
                Login{" "}
              </a>
              <label
                style={{ color: "white", fontWeight: "bold", marginTop: "8px" }}
              >
                |
              </label>
              <a href="/signUp" style={styles.signup} class="nav-item nav-link">
                Signup
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
