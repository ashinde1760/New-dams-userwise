import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

const ChatTable = () => {
  const [values, setValues] = useState([]);
  const [position, setPosition] = useState("center");
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayPosition1, setDisplayPosition1] = useState(false);
  // const [value1, setValue1] = useState('');
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [userId1, setEmpId] = useState("");
  const [chats, setChats] = useState("");
  const [userId2, setStatus] = useState("");
  const [mobileNo, setUserRole] = useState("");
  const [userName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}/chat/list`).then((res) => {
      console.log(res);
      setValues(res.data);
    });
    console.log(values, "../////////////////////////////////");
  }, []);


  axios
      .get(`${process.env.REACT_APP_API_KEY}/chat/multipleChat/${userId1}`)
      .then((res) => {
        console.log(res);
        setChats(res.data);
      });
    console.log(chats, "./././././.aaaaaaaaa");




  const dialogFuncMap = {
    displayPosition: setDisplayPosition,
    displayPosition1: setDisplayPosition1,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    const onSubmit = (e) => {
      e.preventDefault();
      console.log("refresh prevented");
    };

    function saveUser() {
      let data = {
        message,
        userId1: "91A81F02-37E2-445A-91B9-28273EBBFB6C",
        userId2: "CBBCC751-D9FC-4656-82D5-9C2447F8302D",
        email: "shivani@gmail.com",
        mobileNo: "8805403508",
        userName: "Shivani",
      };

      console.log(data, "all data");

      fetch(` ${process.env.REACT_APP_API_KEY}/chat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {});
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <InputText
          style={{height:"30px",width:"220px"}}
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="name"
          />

          <Button
            style={{
              backgroundColor: "white",
              // height: "80%",
              width: "30px",
              color: "#203570",
            }}
            // label="Submit"
            type="button"
            icon="pi pi-send"
            onMouseEnter={saveUser}
            onClick={() => onHide(name)}
            className="p-button-outlined p-button-sm"
          />
        </form>
      </div>
    );
  };




  
  const Footer = (name) => {
    const onSubmit = (e) => {
      e.preventDefault();
      console.log("refresh prevented");
    };

    function saveUser() {
      let data = {
        message,
        userId1: "91A81F02-37E2-445A-91B9-28273EBBFB6C",
        userId2: "CBBCC751-D9FC-4656-82D5-9C2447F8302D",
        email: "shivani@gmail.com",
        mobileNo: "8805403508",
        userName: "Shivani",
      };

      console.log(data, "all data");

      fetch(` ${process.env.REACT_APP_API_KEY}/chat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {});
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <InputText
          style={{height:"30px",width:"220px"}}
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="name"
          />

          <Button
            
             style={{
               backgroundColor: "white",
               height: "80%",
               width: "30px",
               color: "#203570",
             }}
            // label="Submit"
            type="button"
            icon="pi pi-send"
            onMouseEnter={saveUser}
            onClick={() => onHide(name)}
            className="p-button-outlined p-button-sm"
          />
        </form>
      </div>
    );
  };


















  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const dateBodyTemplate = (rowData) => {
    let currentTimestamp = Date.now();

    let date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(currentTimestamp);

    return date;
  };

  return (
    <div>
      <Card>
        <Button
          label="User1"
          style={{ float: "right", backgroundColor: "#203570" }}
          className="p-button-sm"
          onClick={() => onClick("displayPosition", "bottom-left")}
        />
        <Dialog
          header="User1"
          visible={displayPosition}
          position={position}
          style={{
            width: "25vw",
            height: "60vh",
            borderTop: "60px solid  #49ABA0",
            backgroundColor: "#F3F3F3",
          }}
          footer={renderFooter("displayPosition")}
          onHide={() => onHide("displayPosition")}
        >
{/*           
          
          <div value={chats}>
                          {chats.map((data) => (
                         
                            <div key={data.id}>
                              <br />
                              <Card>
                              <h4>{data.message}</h4>
                              </Card>
                              <hr />
                            </div>
                          ))}
                        </div> */}
          
          
          
          
          </Dialog>&nbsp;



     <Button
          label="User2"
          style={{ float: "right", backgroundColor: "#203570" }}
          className="p-button-sm"
          onClick={() => onClick("displayPosition1", "bottom-right")}
        />
        <Dialog
          header="User2"
          visible={displayPosition1}
          position={position}
          style={{
            width: "25vw",
            height: "60vh",
            borderTop: "60px solid  #49ABA0",
            backgroundColor: "#F3F3F3",
          }}
          footer={Footer("displayPosition1")}
          onHide={() => onHide("displayPosition1")}
        >
{/* 
<div value={chats}>
                          {chats.map((data) => (
                            <div key={data.id}>
                              <br />
                              <Card>
                                <h4>{data.message}</h4>
                              </Card>
                              <hr />
                            </div>
                          ))}
                        </div> */}




        </Dialog>


        <br />
        <br />

        <div className="card">
          <DataTable
            value={values}
            paginator
            responsiveLayout="scroll"
            rowHover
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
          >
            <Column
              field="userName"
              header="Recipient Name"
              style={{ width: "40%" }}
            ></Column>
            <Column
              field="message"
              header="Last Messages"
              style={{ width: "40%" }}
            ></Column>
            <Column
              field="createdOn"
              header="Last Active"
              currentTimestamp
              body={dateBodyTemplate}
              style={{ width: "40%" }}
            />
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default ChatTable;
