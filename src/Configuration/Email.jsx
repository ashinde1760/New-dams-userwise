import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Password from "./Password";

import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import axios from "axios";

function Email() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const { docId } = useParams();

  const [values, setValues] = useState([]);

  const toast = useRef(null);

  const [lazyItems, setLazyItems] = useState([]);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);

  // const onCityChange = (e) => {
  //   console.log(e.target.value.name);
  //   setTime(e.target.value.name);
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("refresh prevented");
  // };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document`)
      .then((res) => setValues(res.data));
  }, []);

  const cities = [
    { name: "10AM", code: "NY" },
    { name: "11PM", code: "RM" },
    { name: "8AM", code: "LDN" },
    { name: "5AM", code: "IST" },
    { name: "6PM", code: "PRS" },
  ];

  useEffect(() => {
    setLazyItems(Array.from({ length: 100000 }));
    setLazyLoading(false);
  }, []);

  const onCityChange = (e) => {
    setSelectedCity1(e.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  function saveUser() {
    console.warn({ name, email, mobile, status, time });

    let data = { name, email, mobile, password, status, time };
    fetch("  http://localhost:3000/emailConfig", {
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
      <Card
        style={{
          borderLeft: "8px solid #49ABA0 ",
          backgroundColor: "#F3F3F3",
          height: "360px",
          width: "950px",
        }}
        className="configCard"
      >
        <div className="grid p-fluid">
          <div className="field col-12 md:col-3">
            <p>Time for Email to be sent</p>
            {/* <Dropdown style={{width:"285px"}}value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select " /> */}

            <Dropdown
              style={{ width: "285px", height: "7vh" }}
              value={values}
              options={values}
              //  onChange={onCityChange}
              onChange={(e) => setTime(e.value)}
              optionLabel="time"
              optionValue="time"
              placeholder="Select "
            />
          </div>

          <div className="field col-12 md:col">
            <div
              class="formgroup-inline"
              style={{ marginTop: "30px", marginLeft: "80px" }}
            >
              <div class="field-radiobutton">
                <input
                  type="radio"
                  name="status"
                  value="AM"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
                <label for="city7">AM</label>
              </div>
              <div class="field-radiobutton">
                <input
                  type="radio"
                  name="status"
                  value="PM"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
                <label for="city8">PM</label>
              </div>
            </div>
          </div>
        </div>

        <h4>SMTP Details</h4>
        <br />
        <div className="grid p-fluid">
          <div className="field col-12 md:col-4">
            <label htmlFor="username1" className="  block">
              Host Name
            </label>
            {/* <InputText id="username1" aria-describedby="username1-help" className="p-inputtext-sm block"/>  */}
            {/* <InputText type="text" className="block mb-2" placeholder="" /> */}
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
            <label htmlFor="username1" className=" block">
              Port Name
            </label>
            {/* <InputText id="username1" aria-describedby="username1-help" className="p-inputtext-sm block"/> */}
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

        <div className="grid p-fluid">
          <div className="field col-12 md:col-4">
            <label htmlFor="username1" className=" block">
              User Name
            </label>
            {/* <InputText id="username1" aria-describedby="username1-help" className="p-inputtext-sm block"/> */}
            <InputText
              style={{ height: "6vh" }}
              type="text"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              name="mobile"
            />
          </div>

          <div className="field col-12 md:col-4">
            <label htmlFor="username1" className="  block">
              Password
            </label>
            <InputText
              style={{ height: "6vh" }}
              type="text"
              value={password}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              name="mobile"
            />
          </div>
        </div>
      </Card>

      <Button
        style={{ marginLeft: "86%", color: "#203570" }}
        label="Reset"
        className=" p-button-sm p-button-outlined"
      />
      {/* <Button style={{float:"right"}}  label="Save" className="p-button-sm p-button-outlined" /> */}

      <Button
        style={{ float: "right", backgroundColor: "#203570", color: "white" }}
        type="button"
        label="Save"
        className="p-button-sm"
        onClick={saveUser}
      ></Button>
    </div>
  );
}

export default Email;
