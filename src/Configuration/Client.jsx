import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Client = () => {
  const [state, setState] = useState("white");
  const [show, setShow] = useState(false);

  function myfun() {
    if (state === "white") {
      setState("red");
    } else {
      setState("red");
    }
  }

  function myfun1() {
    if (state === "yellow") {
      setState("green");
    } else {
      setState("green");
    }
  }

  function myfun2() {
    if (state === "yellow") {
      setState("grey");
    } else {
      setState("grey");
    }
  }

  function myfun3() {
    if (state === "yellow") {
      setState("blue");
    } else {
      setState("blue");
    }
  }

  function myfun4() {
    if (state === "yellow") {
      setState("pink");
    } else {
      setState("pink");
    }
  }

  function myfun5() {
    if (state === "yellow") {
      setState("violet");
    } else {
      setState("violet");
    }
  }

  function myfun6() {
    if (state === "yellow") {
      setState("orange");
    } else {
      setState("orange");
    }
  }

  return (
    <div>
      <Card
        style={{
          borderLeft: "8px solid #49ABA0 ",
          backgroundColor: "#F3F3F3",
          height: "270px",
          width: "850px",
        }}
        className="configCard"
      >
        <Button
          icon="pi pi-external-link"
          className="p-button-rounded p-button-outlined"
        />
        <br />
        <br />

        <div className="field">
          <label htmlFor="username1" className="block">
            No.of Days For Expiry
          </label>
          <InputText
            style={{ width: "250px" }}
            id="username1"
            aria-describedby="username1-help"
            className=" p-inputtext-sm block"
          />
          {/* <InputText type="text" className="block mb-2" placeholder="" /> */}
        </div>

        <label>Choose Client Color</label>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: state,
            }}
          >
            S
          </div>
          &nbsp;&nbsp;
          <i
            className="pi pi-plus-circle"
            onClick={() => setShow(!show)}
            style={{ fontSize: "1.5rem" }}
          >
            {show === true ? "" : ""}
          </i>
          &nbsp;&nbsp;
          {show && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
                onClick={myfun}
              ></div>
              &nbsp;&nbsp;
              {/* <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"yellow"}} onClick={myfun}></div>&nbsp;&nbsp; */}
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
                onClick={myfun1}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "grey",
                }}
                onClick={myfun2}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                }}
                onClick={myfun3}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "pink",
                }}
                onClick={myfun4}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "violet",
                }}
                onClick={myfun5}
              ></div>
              &nbsp;&nbsp;
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "orange",
                }}
                onClick={myfun6}
              ></div>
              &nbsp;&nbsp;
            </div>
          )}
        </div>

        {/* <div className="field">
                    <label htmlFor="username1" className="block">No.of Days For Expiry</label>
                    <InputText style={{width:"250px" }} id="username1" aria-describedby="username1-help" className=" p-inputtext-sm block"/> 
                   <InputText type="text" className="block mb-2" placeholder="" />
                </div>
                <p>Choose Client Colour</p>
                <br/>
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp;
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp;
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp;
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp;
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp;
                       <i className="pi pi-circle" ></i>&nbsp;&nbsp; */}
      </Card>
      <Button
        style={{ marginLeft: "86%", color: "#203570" }}
        label="Reset"
        className=" p-button-sm p-button-outlined"
      />
      <Button
        style={{ float: "right", backgroundColor: "#203570", color: "white" }}
        label="Save"
        className=" p-button-sm p-button-outlined"
      />
    </div>
  );
};

export default Client;

//       import React, { useState } from 'react'

// import { BlockPicker } from 'react-color'

// function Colours () {
//   const [selectedColor, setSelectedColor] = useState('#ccc')
//   return (
//     <div className='app'>
//  <BlockPicker
//           color={selectedColor}
//           onChangeComplete={color => setSelectedColor(color.hex)}
//         />
// </div>

//   )
// }

// export default Colours;

// import { setNestedObjectValues } from "formik";
// import React,{ useState } from "react";
// function Colours(){
//   const [state,setState]=useState("white")
//   const [show,setShow] = useState(false);

//   function myfun(){
//   if(state==="white"){
//   setState("red")
//   }
//   else{
//     setState("yellow")
//   }
// }

// function myfun1(){
//   if(state==="yellow"){
//   setState("green")
//   }
//   else{
//     setState("green")
//   }
// }

// function myfun2(){
//   if(state==="yellow"){
//   setState("grey")
//   }
//   else{
//     setState("grey")
//   }
// }

// function myfun3(){
//   if(state==="yellow"){
//   setState("blue")
//   }
//   else{
//     setState("blue")
//   }
// }

// function myfun4(){
//   if(state==="yellow"){
//   setState("pink")
//   }
//   else{
//     setState("pink")
//   }
// }

// function myfun5(){
//   if(state==="yellow"){
//   setState("violet")
//   }
//   else{
//     setState("violet")
//   }
// }

// function myfun6(){
//   if(state==="yellow"){
//   setState("orange")
//   }
//   else{
//     setState("orange")
//   }
// }

//   return(
//     <div style={{display:"flex"}}>
//       <div style={{width:"20px",height:"20px" ,borderRadius:"50%",backgroundColor: state}}>M</div><br/><br/>&nbsp;&nbsp;

//       <i className="pi pi-plus-circle"  onClick={() => setShow(!show)} style={{ fontSize: '1.5rem' }}>
// {show === true? '' : ''}
// </i>&nbsp;&nbsp;

// {show &&
//   <div style={{display:"flex",float:"left"}}>
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"blue"}} onClick={myfun3}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"pink"}} onClick={myfun4}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"violet"}} onClick={myfun5}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"orange"}} onClick={myfun6}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"red"}} onClick={myfun}></div>&nbsp;&nbsp;
//  <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"yellow"}} onClick={myfun}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"green"}} onClick={myfun1}></div>&nbsp;&nbsp;
// <div style={{width:"20px",height:"20px",borderRadius:"50%", backgroundColor:"grey"}} onClick={myfun2}></div>&nbsp;&nbsp;

// </div>
// }

//     </div>
//   );
// }
// export default Colours;
