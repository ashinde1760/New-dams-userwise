import React, { useRef } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import axios from "axios";
function SelectReviewer() {
  const [reviwer, setUserName] = useState("");
  const { docId } = useParams();
  const [position, setPosition] = useState("");
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  const toast = useRef(null);

  const onCityChange = (e) => {
    console.log(e.target.value.name);
    setUserName(e.target.value.name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document`)
      .then((res) => setValues(res.data));
  }, []);


  function deleteUser(docId) {
    console.log("delete user");
    if (docId) {
      axios
        .delete(
          `${process.env.REACT_APP_API_KEY}/document/deleteDocument/${docId}`
        )
        .then((res) => {
          console.log("deleted successfully");
          navigate("/documentdetails");
        });
    } else {
      // alert("something went wrong");
      navigate("/documentdetails");
    }
  }

  const dialogFuncMap = {
    displayBasic1: setDisplayBasic1,
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

  //keyword

  const DeleteFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Submit"
          onMouseDown={() => deleteUser(docId)}
          icon="pi pi-check"
          onClick={() => onHide(name)}
          className="p-button-sm"
          autoFocus
        />

        
      </div>
    );
  };

  function saveUser() {
    console.warn({ reviwer});
    let data = { docId, reviwer };
    // window.location.reload();
    console.log(data, "all data");

    fetch(`${process.env.REACT_APP_API_KEY}/document/setReviwer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(
      (result) => {
        console.log(result, "nmx///////////////////////////");

        if (result.status === 200) {
          console.warn("result...!!!", result);
          result.json().then((resp) => {
            console.warn("resp", resp);
          });
          toast.current.show({
            severity: "success",
            summary: "Document Added",
            detail: "Document Added Successfully",
            life: 6000,
          });
          

        } else {
          toast.current.show({
            severity: "warn",
            summary: "Document Not Added",
            detail: "Error while Adding Document",
            life: 6000,
          });
         
        }
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "User Not Added",
          detail: "Error while Adding User",
          life: 6000,
        });
        
      }
    );
  
  }


  return (
    <div>
      <Card>
        <Toast ref={toast} />
        <form onSubmit={onSubmit}>
          <Card
            style={{
              borderLeft: "8px solid  #49ABA0",
              backgroundColor: "#F3F3F3",
              width: "950px",
            }}
          >
            <label>Select Reviewer</label>
            <br />

            <Dropdown
              style={{ width: "30%" }}
              value={reviwer}
              options={values}
              onChange={(e) => setUserName(e.value)}
              optionLabel="userName"
              optionValue="userName"
              placeholder="Select"
            />
          </Card>
          <br />
          <br />
          <div style={{ float: "right" }}>
            <Button
              label="Withdraw"
              className="p-button-outlined p-button-sm"
              onClick={() => onClick("displayBasic1")}
            />
            <Dialog
              header="Withdraw Document ?"
              visible={displayBasic1}
              style={{ width: "40vw" }}
              footer={DeleteFooter("displayBasic1")}
              onHide={() => onHide("displayBasic1")}
            >
              <p>
                Are you sure you want to withdraw this document, you will lose
                all data saved to the system
              </p>
            </Dialog>
            &nbsp;
            <Button
              label="Save as Draft"
              className="p-button-sm p-button-outlined"
            />
            &nbsp;
            <Button
              type="button"
              onClick={saveUser}
              style={{ backgroundColor: "#203570", color: "white" }}
              label="Submit"
              className=" p-button-sm p-button-outlined"
            />
            &nbsp;
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SelectReviewer;
