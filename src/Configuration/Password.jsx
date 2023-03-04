import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function Password() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [charactor, setCharactor] = useState("");
  const [uppercase, setUppercase] = useState("");
  const [lowercase, setLowercase] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  function saveUser() {
    console.warn({
      name,
      email,
      mobile,
      status,
      charactor,
      uppercase,
      lowercase,
    });
    let data = { name, email, mobile, status, charactor, uppercase, lowercase };
    fetch("  http://localhost:3000/passwordConfig", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      // console.warn("result",result);
      result.json().then((resp) => {
        console.warn("resp", resp);
      });
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Card
          style={{
            borderLeft: "8px solid #49ABA0 ",
            backgroundColor: "#F3F3F3",
            height: "250px",
            width: "90%",
           
          }}
          className="configCard"
        >
          <div className="grid p-fluid">
            <div className="field col-12 md:col-4">
              <label htmlFor="username1" className="block">
                No.of Days For Expiry
              </label>

              <InputText
                style={{ height: "6vh" }}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="username1" className="block">
                No.of Attempt before Lockout
              </label>

              <InputText
                style={{ height: "6vh" }}
                type=" text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
              />
            </div>
          </div>

          <h4>Password should have</h4>
          <br />
          <div className="grid p-fluid">
            <div className="field col-12 md:col-3">
              No.of Days for Expiry
              <div class="formgroup-inline">
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="status"
                    value="YES"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  <label for="city7">Yes</label>
                </div>
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="status"
                    value="NO"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  <label for="city8">No</label>
                </div>
              </div>
            </div>

            <div className="field col-12 md:col-3">
              Special Characters(@,#,$,%)
              <div class="formgroup-inline">
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="charactor"
                    value="YES"
                    onChange={(e) => {
                      setCharactor(e.target.value);
                    }}
                  />
                  <label for="city7">Yes</label>
                </div>
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="charactor"
                    value="NO"
                    onChange={(e) => {
                      setCharactor(e.target.value);
                    }}
                  />
                  <label for="city8">No</label>
                </div>
              </div>
            </div>
            {/* <div className="field "> */}
            <div className="field col-12 md:col-3">
              Upper Case Letters
              <div class="formgroup-inline">
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="uppercase"
                    value="YES"
                    onChange={(e) => {
                      setUppercase(e.target.value);
                    }}
                  />
                  <label for="city7">Yes</label>
                </div>
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="uppercase"
                    value="NO"
                    onChange={(e) => {
                      setUppercase(e.target.value);
                    }}
                  />
                  <label for="city8">No</label>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="field col-12 md:col">
              Lower Case Letters
              <div class="formgroup-inline">
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="lowercase"
                    value="YES"
                    onChange={(e) => {
                      setLowercase(e.target.value);
                    }}
                  />
                  <label for="city7">Yes</label>
                </div>
                <div class="field-radiobutton">
                  <input
                    type="radio"
                    name="lowercase"
                    value="NO"
                    onChange={(e) => {
                      setLowercase(e.target.value);
                    }}
                  />
                  <label for="city8">No</label>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <br />
        <br />

        <Button
          style={{ marginLeft: "84%", color: "#203570" }}
          label="Cancel"
          className="p-button-sm p-button-outlined"
        />
        {/* <Button
        style={{ float: "right" }}
        label="Submit"
        className="p-button-sm p-button-outlined"
      /> */}
        <Button
          className="p-button-sm"
          type="button"
          style={{ float: "right", backgroundColor: "#203570", color: "white" }}
          label="Submit"
          onClick={saveUser}
        ></Button>
      </form>
    </div>
  );
}

export default Password;
