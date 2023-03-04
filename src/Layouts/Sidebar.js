import "./css/sidebar.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "primereact/button";

import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiOutlineUser } from "react-icons/hi";
import { GrDocumentConfig } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { AiOutlineAppstore, AiOutlineSearch } from "react-icons/ai";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [Mobile, setMobile] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [role, setRole] = useState();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  });

//   this is for admin
  const menuItem = [
    {
      path: "/dashboardMain",
      name: "Documents",
      icon: <AiOutlineAppstore />,
    },
    {
      path: "/documentsearch",
      name: "SearchBot",
      icon: <AiOutlineSearch />,
    },
    {
      path: "/configMain",
      name: "Configuration",
      icon: <GrDocumentConfig />,
    },
    {
      path: "/history",
      name: "AuditHistory",
      icon: <MdHistory />,
    },
    {
      path: "/ChatTable",
      name: "ChatBot",
      icon: <HiOutlineChatBubbleOvalLeftEllipsis />,
    },
    {
      path: "/role",
      name: "User Management",
      icon: <HiOutlineUser />,
    },
  ];


//   this is for reviewer
  const menuItem1 = [
    {
      path: "/dashboardMain",
      name: "Documents",
      icon: <AiOutlineAppstore />,
    },
    {
      path: "/documentsearch",
      name: "SearchBot",
      icon: <AiOutlineSearch />,
    },
  ];

  if (role == "Admin") {
    return (
      <>
        <div>
          {/* navbar */}

          {/* sidebar */}
          <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section">
              {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
              <div>
                {/* <IoLogInOutline onClick={toggle}/> */}

                <i
                  style={{ marginLeft: isOpen ? "150px" : "0px" }}
                  onClick={toggle}
                  id="bars"
                  className="pi pi-sign-in"
                ></i>
              </div>
            </div>
            <div className="paths">
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <div activeclassName="active">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          {/* <main>{children}</main> */}
        </div>

        {/* <div className="navbar">
        <Link to="#" className="menu-bars" onClick={showSidebar}>
         #
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              123
            </Link>
          </li>

          {menuItem.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> */}
      </>
    );
  }
  if (role == "Reviewer") {
    return (
      <>
        <div>
          {/* navbar */}

          {/* sidebar */}
          <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section">
              {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
              <div>
                {/* <IoLogInOutline onClick={toggle}/> */}

                <i
                  style={{ marginLeft: isOpen ? "150px" : "0px" }}
                  onClick={toggle}
                  id="bars"
                  className="pi pi-sign-in"
                ></i>
              </div>
            </div>
            <div className="paths">
              {menuItem1.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <div activeclassName="active">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          {/* <main>{children}</main> */}
        </div>

        {/* <div className="navbar">
        <Link to="#" className="menu-bars" onClick={showSidebar}>
         #
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              123
            </Link>
          </li>

          {menuItem.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> */}
      </>
    );
  }
}

export default Sidebar;
