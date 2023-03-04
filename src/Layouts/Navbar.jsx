import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Button } from "primereact/button";
import { Navigate, useNavigate } from "react-router";

// import Contact from './Contact'
// import bell from "./Images/bell.png";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  const navigate = useNavigate();


  function Logout(){
    localStorage.clear('role')
    navigate("/");

  }

  return (
    <>
      <nav className="navbar">
        <div style={{ marginLeft: "25px" }}>
          <h2>
            <i>
              <b>pwc</b>
            </i>
          </h2>
        </div>
        <span style={{ fontSize: "large" }}>| Digital Accounting Manuals</span>

        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          {/* <Link to='/' className='home'>
            <li>Home</li>
          </Link>
          <Link to='/about' className='about'>
            <li>About</li>
          </Link>
          <Link to='/services' className='services'>
            <li>Services</li>
          </Link> */}
          <Link to="/skills" className="skills">
            <li>
              <i className="pi pi-question-circle"></i> Help
            </li>
          </Link>
          {/* <Link to="/contact" className="home">
            <li>
              <i className="pi pi-bell"></i> Notification
            </li>
          </Link> */}
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-info"
            style={{ marginRight: "20px", height: "35px", width: "35px" }}
            aria-label="User"
          />

          <Button icon="pi pi-logout"  label="Logout" onClick={Logout}></Button>


          {/* <Button icon="pi pi-user" className="p-button-rounded p-button-info"  aria-label="User" /> */}
        </ul>
        {/* 
        whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
        */}
        <Button
          style={{ borderRadius: "5px" }}
          className="mobile-menu-icon"
          onClick={() => setMobile(!Mobile)}
        >
          {Mobile ? <ImCross /> : <FaBars />}
        </Button>
      </nav>
    </>
  );
};
export default Navbar;
