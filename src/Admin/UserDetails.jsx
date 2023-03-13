import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Navigate, NavLink } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState("");
  const [createdBy] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();

  const cities = [{ name: "Admin" }, { name: "viewer" }, { name: "Reviewer" }];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  function saveUser() {
    console.warn({ userName, emailId, empId, status, userRole, createdBy });
    let data = {
      userName,
      emailId,
      empId,
      status,
      userRole,
      createdBy: "shivani",
    };

    console.log(data, "all data");

    fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        console.warn("result...!!!", result);
        result.json().then((resp) => {
          console.warn("resp", resp);
         
        });
        toast.current.show({
          severity: "success",
          summary: "User Added",
          detail: "User Added Successfully",
          life: 6000,
          
        });
        //  navigate("/role")
      } else {
        toast.current.show({
          severity: "warn",
          summary: "User Not Added",
          detail: "Error while Adding User",
          life: 6000,
        });
        

      }


    },
    (error)=>{
      toast.current.show({
        severity: "error",
        summary: "User Not Added",
        detail: "Error while Adding User",
        life: 6000,
      });
   
    });
    navigate("/role")
  }
 
  return (
    <div>
      <Toast ref={toast} />

      <NavLink to="/role" className="link1">
        <Button
          icon=" pi pi-chevron-circle-left  "
          style={{ backgroundColor: "white" }}
          label="Add New User"
          className="p-button-raised p-button-secondary p-button-text p-button-sm"
        />
      </NavLink>
      <br />
      <br />

      <Card style={{ height:"370px"}}>
        {/* &nbsp; &nbsp; */}
        <label>
          <b>User Details</b>
        </label>
        <br />

        <br />
        <form onSubmit={onSubmit}>
          <Card
            style={{
              borderLeft: "9px solid #49ABA0 ",
              backgroundColor: "#F3F3F3",
              width: "950px",
              height:"240px"
            
            }}
          >
            <div class="grid">
              <div class="col">
                <label htmlFor="username1" className="block">
                  User Name
                </label>
                <br />
                <InputText
                  style={{ height: "40px" }}
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  name="name"
                />
              </div>

              <div class="col">
                <label htmlFor="username1" className="block">
                  Email ID
                </label>
                <br />

                <InputText
                  style={{ height: "40px" }}
                  type="text"
                  placeholder="Email ID"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                  name="email"
                />
              </div>
              <div class="col">
                <label htmlFor="username1" className="block">
                  EMP ID
                </label>
                <br />
                <InputText
                  style={{ height: "40px" }}
                  type="text"
                  placeholder="EMP ID"
                  value={empId}
                  onChange={(e) => {
                    setEmpId(e.target.value);
                  }}
                  name="mobile"
                />
              </div>
            </div>

            <div class="grid">
              <div class="col-4">
                <br />
                <label> User Role </label>
                <br />
                <br />
                <Dropdown
                  style={{ width: "70%" }}
                  value={userRole}
                  options={cities}
                  
                  //  onChange={(e) => onCityChange(e)}
                  onChange={(e) =>  setUserRole(e.value)}
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Select "
                />
              </div>

              {/* <div style={{marginRight:"30% "}}> */}
              <div class="col-4">
                <br />

                <label> Status </label>
                <br />
                <br />

                <div class="formgroup-inline">
                  <div class="field-radiobutton">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />
                    <label for="city7">Active</label>
                  </div>

                  <div class="field-radiobutton">
                    <input
                      type="radio"
                      name="status"
                      value="Deactive"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />
                    <label for="city8">Deactive</label>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </Card>
          <br />
          {/* <br /> */}

          <Button
            style={{ marginLeft: "84%" }}
            label="Cancel"
            className="p-button-outlined p-button-sm"
          />

          <Button
            style={{
              float: "right",
              backgroundColor: "#203570",
              color: "white",
            }}
            // onChange={showSuccess}
            label="Submit"
            type="button"
            onClick={saveUser}
            className="p-button-outlined p-button-sm"
            
          />
          
        </form>
      </Card>
    </div>
  );
}

export default UserDetails;





