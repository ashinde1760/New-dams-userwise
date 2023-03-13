import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { CustomerService } from "../service/CustomerService";
import { Card } from "primereact/card";
import { useParams } from "react-router-dom";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollPanel } from "primereact/scrollpanel";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Product = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [section, setSection] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const { docId } = useParams();
  
const [position, setPosition] = useState("");
  const [upload, setUpload] = useState("");
  const [comment, setComment] = useState("");
  const [keyword,  setKeyword] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState();

  const customerService = new CustomerService();

  useEffect(() => {
    console.log("customerService.docId:", docId);
    //     docId =customerService.docId;
    //   alert(docId);
    getData(docId);
    // fetchKeyword();

    console.log(getData, ".//.////////./vivek");
  }, []);

  const fetchKeyword = async () => {
    const response = await fetch(`http://192.168.1.61:8082/sample/getTerms`);
    const data = await response.json();
    setKeyword(data);
  };


  //Comments
  // const getComment = async () => {
    
  //   const res = await fetch('http://192.168.1.61:8082/comment/${');
  //   const data = await res.json();
  //   setUsers(data);
  //   console.log(setUsers,".//////////////////////////////////////////");
  // };
  
    







  // console.log(setKeyword,".////.//.////");

  // useEffect(() => {
  //   fetchKeyword();
  // }, []);


  //keyword
  const fetchData = (rowData) => {
    console.log(rowData, "section id./././././");
    setSectionData(rowData);
   
  };

  function deleteUser(docId) {
   console.log("delete user");
 if(docId){
    axios
      .delete(`${process.env.REACT_APP_API_KEY}/document/deleteDocument/${docId}`)
      .then((res) => {
        console.log("deleted successfully");
        navigate("/docUploadPage/");
      });
    }else{
      // alert("something went wrong")
      navigate("/docUploadPage/");
    }
  
  }


  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic1: setDisplayBasic1,
    displayResponsive: setDisplayResponsive,
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

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
    
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          onClick={saveUser}
          style={{backgroundColor:"#203570"}}
          className="p-button-sm"
          autoFocus
        />

        {/* // onClick={() => onHide(name)} */}
      </div>
    );
  };


  // Comments
  // const Footer = (name) => {
  //   return (
  //     <div>
  //       <Button
  //         label="Cancel"
  //         icon="pi pi-times"
  //         onClick={() => onHide(name)}
  //         className="p-button-sm p-button-text"
  //       />
  //       <Button
  //         label="Submit"
  //         onClick={saveComment}
  //         icon="pi pi-check"
  //         className="p-button-sm"
  //         autoFocus
  //       />

        {/* // onClick={() => onHide(name)} */}
  //     </div>
  // );
  //  }; 


  //withdraw
  const DeleteFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          // icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-outlined"
        />
        <Button
          label="Yes"
          style={{backgroundColor:"#203570"}}
          onMouseEnter={() => deleteUser(docId)}
          onClick={() => onHide(name)}
          // icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />

        {/* // onClick={() => onHide(name)} */}
      </div>
    );
  };

  function saveUser() {
    console.warn({ upload });
    let data = { upload };
    fetch(
      `http://192.168.1.59:8080/sample/addTerm/` + upload,

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn("resp", resp);
      });
    });
  }

  // function saveComment() {
  //   console.warn({ comment });
  //   let data = { comment };
  //   fetch(`http://192.168.1.61:8082/comment/${docId}` + comment,

  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   ).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn("resp", resp);
  //     });
  //   });
  // }

  // const fetchData = async (rowData) => {
  //   console.log(rowData, "section id./././././");
  //   axios
  //     .get(`http://192.168.1.61:8082/document/getSectionData/${rowData.id}`)
  //     .then((res) => {
  //       console.log(
  //         res,
  //         "data of section 1....//////////////////////////////////."
  //       );
  //       setSectionData(res.data);
  //     });
  // };

  //document
  const getData = async (docId) => {
    // console.log(docId, "inside");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${docId}`)

      .then((res) => {
        console.log(res, "data of sections");
        setSection(res.data);
        
      });
  };

  const save = async () => {
    navigate("/selectReviewer/" + docId);
    console.log(docId,"shivani.//.///.///.//.//")
  };

  const CommentTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (

    

      <Button
        style={{ float: "right" }}
        // onClick={() => getComment(rowData)}
        icon="pi pi-chevron-circle-right"
        className="p-button-rounded p-button-text"
      />
    );
  };








  const actionBodyTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (

    

      <Button
        style={{ float: "right" }}
        onClick={() => fetchData(rowData)}
        icon="pi pi-chevron-circle-right"
        className="p-button-rounded p-button-text"
      />
    );
  };


function handleChange(event) {
    setFile(event.target.files[0]);
  }


 function handleSubmit(event) {
  
event.preventDefault();
    const url =`${process.env.REACT_APP_API_KEY}/document/uploadSec`;
   

    //http://192.168.1.59:8080/sample/document
    const formData = new FormData();
    formData.append("file", file);

     formData.append("docId", docId);
  console.log(formData, "//////////////////////////////");
 axios.post(url, formData).
 then((res) => {
      });

 }







  return (
    <div>
      <Card style={{ height: "480px",}}>
        <div class="grid">
          <div class="col-6">
            <div className="datatable-scroll-demo">
              <Card
                style={{
                  borderLeft: "8px solid  #49ABA0",
                  backgroundColor: "#F3F3F3",
                  width: "560px",
                  height: "400px",
                }}
              >
                <label><b>Identifies Sections</b></label>
                  
                <ScrollPanel style={{ width: "100%", height: "300px" }}>
                <DataTable
                  value={section}
                  rowHover
                  selection={selectedCustomers}
                  onSelectionChange={(e) => setSelectedCustomers(e.value)}
                 body={CommentTemplate}
                  loading={loading}
                >
              <Column field="sectionName" style={{ height: "10px" }}></Column>
              
              <Column bodyStyle={{ height: "10px" }} body={actionBodyTemplate}/>
                </DataTable>
                </ScrollPanel>
              </Card>
            </div>
          </div>

          <div class="col-6">
            <Card
              style={{
                borderLeft: "8px solid #49ABA0",
                backgroundColor: "#F3F3F3",
                width: "550px",
                height: "400px",
              }}
            >
              
              <ScrollPanel style={{ width: "100%", height: "300px" }}>

                <h5>Identified Section Keywords</h5>
{/* 
add Keyword */}


                <Button
                  style={{ float: "right" ,color:"#203570"}}
                
                  label="Add Keywords"
                  className="p-button-text p-button-sm"
                 
                  icon="pi pi-plus-circle"
                  onClick={() => onClick("displayBasic")}
                />
                <Dialog
                  header="Add Keywords"
                  visible={displayBasic}
                  style={{ width: "25vw" }}
                  footer={renderFooter("displayBasic")}
                  onHide={() => onHide("displayBasic")}
                >
                  <InputText
                    type="text "
                    placeholder="Enter Keyword"
                    onChange={(e) => {
                    setUpload(e.target.value);
                    }}
                  />
                </Dialog>

                {/* 
      <div>
        {users.length > 0 && (
    
        <ul>
          {users.map(user => (
      
     <Tag icon="pi pi-times"  >
            <li style={{}}   key={user.id}>{user.upload}</li>
     </Tag>
          ))}
        </ul>
      )}
    </div> */}
    
    {/* keyword */}

                {/* <div value={keyword}>
                  {keyword.map((data) => (
                    <div key={data.id}>
                     
                   
                      <Tag style={{float:"right"}} icon="pi pi-times">{data.term}</Tag>
                    </div>
                  ))}
                </div>
             */}
             <br/>
             <br/>
             <br/>
             <hr/>
                {/* <div>
                  <b>Identified Section </b>
                </div> */}
               
               {/* //Comments */}


        <div>
        {users.map((user) => (
          <div key={user.comment}
          >{user.comment}</div>
        ))}
      </div>




{/* section */}
         
                  <div>
                    <b>{sectionData.sectionName}</b>
                    <br />
                    <br />
                    <i>{sectionData.sectionContaion}</i>
                  </div>
              
              



{/* 
<hr/>
<br/>
<br/>

 <div className="App">
          <form onSubmit={handleSubmit}>
            
          Upload Document
                <Card
                  style={{
                    backgroundColor: "#D4EBE9 ",
                    width: "480px",
                    height: "25vh",
                  }}
                >
                  
                  
                  <div
                    style={{
                      border: "1.5px dotted",
                      backgroundColor:" #D4EBE9",
                      height: "80px",
                      width: "100%",
                      borderRadius:"5px",
                      marginBottom: "100%",
                    }}
                  >
                    <div style={{display:"flex"}}>
                <input
                      style={{ marginTop: "15px", marginLeft: "15px" }}
                      type="file"
                      onChange={handleChange}
                    /> */}
          {/* <h6>Eligible Formats:DOCX,DOC and PDF</h6> */}
                   {/* </div>
                
                 
</div>
                
               

                 
                </Card>
             
          </form>
        </div> */}
     








{/* //comment */}

                {/* <Button
                  style={{ float: "right" }}
                  label="Add Comments"
                  className="p-button-sm"
                  onClick={() => onClick("displayResponsive")}
                />
                
                <Dialog
                  header="Add Comments"
                  visible={displayResponsive}
                  onHide={() => onHide("displayResponsive")}
                  breakpoints={{ "960px": "75vw" }}
                  style={{ width: "36vw" }}
                  footer={Footer("displayResponsive")}
                >
                  <InputTextarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    cols={46}
                  />
                </Dialog> */}
              </ScrollPanel>
            </Card>
            <br />

            <div style={{ float: "right" }}>

      

            <Button
                label="Submit"
                style={{color:"#203570"}}
                className="p-button-outlined p-button-sm"
                onClick={handleSubmit}
              />&nbsp;






         <Button
                label="Withdraw"
                style={{color:"#203570"}}
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
                style={{color:"#203570"}}
                className="p-button-outlined p-button-sm"
              />
              &nbsp;
             
              <Button className="nextBtn p-button-sm" style={{backgroundColor:"#203570"}}onClick={save}>
                Next
           
     
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Product;
